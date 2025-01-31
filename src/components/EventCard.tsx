import { Event } from "../types";
import { useEventSignUp } from "../hooks/useEventSignUp";
import "./eventCard.scss";

interface EventCardProps {
  event: Event;
  user: any;
  isStaff: boolean;
  onEditEvent: (eventId: string) => void;
}

export function EventCard({ event, user, isStaff, onEditEvent }: EventCardProps) {
  const { attendees, isSignedUp, handleSignUp, formattedDate, formattedTime } = useEventSignUp(event, user);

  return (
    <div className="eventCard">
      <h1>
        {event.title}
      </h1>
      <p className="description">{event.description}</p>
      <p className="text">Date: {formattedDate}</p>
      <p className="text">Time: {formattedTime}</p>
      <p className="text">Location: {event.location}</p>
      <p className="text">Capacity: {attendees.length} / {event.capacity}</p>

      <div className="buttonContainer">
        {isStaff ? (
          <button className="actionButton" onClick={() => onEditEvent(event.id)}>Edit</button>
        ) : (
          <button className="actionButton" onClick={handleSignUp} disabled={isSignedUp || attendees.length >= event.capacity}>
            {isSignedUp ? "Already Signed Up" : attendees.length >= event.capacity ? "Event Full" : "Sign up"}
          </button>
        )}
      </div>
    </div>
  );
}
