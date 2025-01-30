import { EventCard } from "./EventCard";
import { Event } from "../types";
import "./eventCard.scss";

interface EventsListProps {
  user: any;
  events: Event[];
  isStaff: boolean;
}

export function EventsList({ user, events, isStaff }: EventsListProps) {
  if (events.length === 0) return <p>Loading events...</p>;

  return (
    <div>
      {events.map((e) => (
        <div className="container" key={e.id}>
          <EventCard event={e} user={user} isStaff={isStaff} />
        </div>
      ))}
    </div>
  );
}
