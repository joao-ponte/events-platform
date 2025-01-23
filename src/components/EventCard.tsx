import { Event } from "../types";
import { addAttendeeToEvent } from "../services/eventsApi";
import "./eventCard.scss";

interface EventCardProps {
  event: Event;
  user: any; // User object from Firebase
}

export function EventCard({ event, user }: EventCardProps) {
  const totalAttendees = event.attendees.length;

  const handleSignUp = async () => {
    if (!user) {
      alert("Please sign in to register for this event.");
      return;
    }

    try {
      await addAttendeeToEvent(event.id, user.email); // Add the user's email to the event's attendees
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
        Capacity: {totalAttendees} / {event.capacity}
      </p>
      <div className="buttonContainer">
        <button
          className="signUpButton"
          onClick={handleSignUp}
          disabled={totalAttendees >= event.capacity}
        >
          {totalAttendees >= event.capacity ? "Event Full" : "Sign up"}
        </button>
      </div>
    </div>
  );
}
