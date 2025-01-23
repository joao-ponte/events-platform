import { useState } from "react";
import { Event } from "../types";
import { addAttendeeToEvent } from "../services/eventsApi";
import "./eventCard.scss";

interface EventCardProps {
  event: Event;
  user: any; // User object from Firebase
}

export function EventCard({ event, user }: EventCardProps) {
  const [attendees, setAttendees] = useState<string[]>(event.attendees); // Local state for attendees

  const handleSignUp = async () => {
    if (!user) {
      alert("Please sign in to register for this event.");
      return;
    }

    try {
      await addAttendeeToEvent(event.id, user.email); // Add the user's email to Firestore
      setAttendees((prev) => [...prev, user.email]); // Update local state with the new attendee
      alert(`Successfully signed up for ${event.title}!`);
    } catch (error) {
      console.error("Failed to sign up for the event:", error);
      alert("An error occurred while signing up. Please try again.");
    }
  };

  return (
    <div className="eventCard">
      <h1>{event.title}</h1>
      <p className="description">{event.description}</p>
      <p className="text">Date: {event.date}</p>
      <p className="text">Location: {event.location}</p>
      <p className="text">
        Capacity: {attendees.length} / {event.capacity}
      </p>
      <div className="buttonContainer">
        <button
          className="signUpButton"
          onClick={handleSignUp}
          disabled={attendees.length >= event.capacity}
        >
          {attendees.length >= event.capacity ? "Event Full" : "Sign up"}
        </button>
      </div>
    </div>
  );
}
