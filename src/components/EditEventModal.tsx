import { useState, useEffect } from "react";
import { updateEvent, fetchEventById, deleteEvent } from "../services/eventsApi";
import { Timestamp } from "firebase/firestore";
import "./editEventModal.scss";

interface EditEventModalProps {
  eventId: string;
  onClose: () => void;
  onEventUpdated: (updatedEvent: any) => void;
  onEventDeleted: (deletedEventId: string) => void;
}

export function EditEventModal({ eventId, onClose, onEventUpdated, onEventDeleted }: EditEventModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [attendees, setAttendees] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [successMode, setSuccessMode] = useState(false);

  useEffect(() => {
    const loadEventDetails = async () => {
      try {
        const event = await fetchEventById(eventId);
        setTitle(event.title);
        setDescription(event.description);
        setLocation(event.location);
        setCapacity(event.capacity.toString());
        setTimestamp(event.timestamp.toDate().toISOString().slice(0, 16));
        setAttendees(event.attendees || []);
      } catch (err) {
        setError("Error loading event details.");
      }
    };

    loadEventDetails();
  }, [eventId]);

  const handleUpdateEvent = async () => {
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
      setError("You cannot set an event in the past.");
      return;
    }

    if (!confirmSave) {
      setConfirmSave(true);
      return;
    }

    try {
      setLoading(true);
      const updatedEvent = {
        title,
        description,
        timestamp: Timestamp.fromDate(eventDate),
        location,
        capacity: Number(capacity),
        attendees,
      };

      await updateEvent(eventId, updatedEvent);
      setSuccessMode(true);

      setTimeout(() => {
        onEventUpdated({ id: eventId, ...updatedEvent });
        setSuccessMode(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError("Failed to update event.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    try {
      setLoading(true);
      await deleteEvent(eventId);
      setSuccessMode(true);

      setTimeout(() => {
        onEventDeleted(eventId);
        setSuccessMode(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError("Failed to delete event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {successMode ? (
          <h2 className="success-message">✅ Event Updated Successfully!</h2>
        ) : (
          <>
            <h2>Edit Event</h2>
            {error && <p className="error">{error}</p>}
            {confirmSave && <p className="warning">⚠️ Are you sure you want to save these changes?</p>}
            {confirmDelete && <p className="warning">⚠️ Are you sure you want to delete this event?</p>}

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

            <h3>Attendees</h3>
            <ul>
              {attendees.map((attendee) => (
                <li key={attendee}>
                  {attendee}{" "}
                </li>
              ))}
            </ul>

            <button onClick={handleUpdateEvent} disabled={loading}>
              {loading ? "Saving..." : confirmSave ? "Confirm Save" : "Save Changes"}
            </button>
            <button className="deleteButton" onClick={handleDeleteEvent} disabled={loading}>
              {loading ? "Deleting..." : confirmDelete ? "Confirm Delete" : "Delete Event"}
            </button>
            <button onClick={onClose}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}
