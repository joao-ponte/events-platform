import { EventCard } from "./EventCard";
import { Event } from "../types";
import "./eventCard.scss";

interface EventsListProps {
  user: any;
  events: Event[];
  isStaff: boolean;
  onEditEvent: (eventId: string) => void;
}

export function EventsList({ user, events, isStaff, onEditEvent }: EventsListProps) {
  if (events.length === 0) return <p>Loading events...</p>;

  return (
    <div>
      {events.map((e) => (
        <div className="container" key={e.id}>
          <EventCard event={e} user={user} isStaff={isStaff} onEditEvent={onEditEvent} />
        </div>
      ))}
    </div>
  );
}
