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
  const { attendees = [], isSignedUp, handleSignUp, formattedDate, formattedTime } = useEventSignUp(event, user);

  return (
    <div className="event-card">
      <h1>
        {event.title}
      </h1>
      <p className="description">{event.description}</p>
      <p className="text">Date: {formattedDate}</p>
      <p className="text">Time: {formattedTime}</p>
      <p className="text">Location: {event.location}</p>
      <p className="text">Capacity: {attendees?.length || 0} / {event.capacity}</p>

      <div className="button-container">
        {isStaff ? (
          <button className="action-button" onClick={() => onEditEvent(event.id)}>Edit</button>
        ) : (
          <button className="action-button" onClick={handleSignUp} disabled={isSignedUp || (attendees?.length || 0) >= event.capacity}>
            {isSignedUp ? "Already Signed Up" : (attendees?.length || 0) >= event.capacity ? "Event Full" : "Sign up"}
          </button>
        )}
      </div>
    </div>
  );
}
