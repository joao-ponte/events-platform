import { Event } from "../types"; // same shared type
import "./eventCard.scss";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const totalAttendees = event.attendees.length;
  return (
    <div className="eventCard">
      <h1>{event.title}</h1>
      <p className="description">{event.description}</p>
      <p className="text">Date: {event.date}</p>
      <p className="text">Location: {event.location}</p>
      <p className="text">Capacity: {totalAttendees} / {event.capacity}</p>
      <div className="buttonContainer">
        <button className="signUpButton">Sign up</button>
      </div>
    </div>
  );
}