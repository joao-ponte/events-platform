import "./eventCard.scss";
import { useEventSignUp } from "../hooks/useEventSignUp";
import { Event } from "../types";

interface EventCardProps {
  event: Event;
  user: any;
}

export function EventCard({ event, user }: EventCardProps) {
  const {
    attendees,
    isSignedUp,
    handleSignUp,
    formattedDate,
    formattedTime,
  } = useEventSignUp(event, user);

  return (
    <div className="eventCard">
      <h1>{event.title}</h1>
      <p className="description">{event.description}</p>
      <p className="text">Date: {formattedDate}</p>
      <p className="text">Time: {formattedTime}</p>
      <p className="text">Location: {event.location}</p>
      <p className="text">
        Capacity: {attendees.length} / {event.capacity}
      </p>
      <div className="buttonContainer">
        <button
          className="signUpButton"
          onClick={handleSignUp}
          disabled={isSignedUp || attendees.length >= event.capacity}
        >
          {isSignedUp ? "Already Signed Up" : attendees.length >= event.capacity ? "Event Full" : "Sign up"}
        </button>
      </div>
    </div>
  );
}
