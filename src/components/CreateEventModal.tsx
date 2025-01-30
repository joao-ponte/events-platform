import { useState } from "react";
import { createEvent } from "../services/eventsApi";
import { Timestamp } from "firebase/firestore";
import "./createEventModal.scss";

interface CreateEventModalProps {
  onClose: () => void;
  onEventCreated: (newEvent: any) => void;
}

export function CreateEventModal({ onClose, onEventCreated }: CreateEventModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMode, setSuccessMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async () => {
    setError(null);

    if (!title || !description || !timestamp || !location || !capacity) {
      setError("All fields are required.");
      return;
    }

    if (isNaN(Number(capacity)) || Number(capacity) <= 0) {
      setError("Capacity must be a positive number.");
      return;
    }

    const eventDate = new Date(timestamp);
    if (isNaN(eventDate.getTime())) {
      setError("Invalid date format. Please select a valid date and time.");
      return;
    }

    const now = new Date();
    if (eventDate <= now) {
      setError("You cannot create an event in the past. Please select a future date.");
      return;
    }

    try {
      setLoading(true);
      const eventData = {
        title,
        description,
        timestamp: Timestamp.fromDate(eventDate),
        location,
        capacity: Number(capacity),
        attendees: [],
      };

      const eventId = await createEvent(eventData);
      const newEvent = { id: eventId, ...eventData };

      setSuccessMode(true);

      onEventCreated(newEvent);

      setTimeout(() => {
        setSuccessMode(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {successMode ? (
          <h2 className="success-message">🎉 Event Created Successfully!</h2>
        ) : (
          <>
            <h2>Create Event</h2>
            {error && <p className="error">{error}</p>}
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input
              type="datetime-local"
              value={timestamp}
              min={new Date().toISOString().slice(0, 16)}
              onChange={(e) => setTimestamp(e.target.value)}
            />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <input type="number" placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
            <button onClick={handleCreateEvent} disabled={loading}>
              {loading ? "Saving..." : "Create Event"}
            </button>
            <button onClick={onClose}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}
