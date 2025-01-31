import { EventCard } from "./EventCard";
import { Event } from "../types";
import "./eventCard.scss";

interface EventsListProps {
  user: any;
  events: Event[];
  isStaff: boolean;
  loading: boolean;
  onEditEvent: (eventId: string) => void;
}

export function EventsList({ user, events, loading, isStaff, onEditEvent }: EventsListProps) {
  if (loading) return <p>Loading events...</p>; 
  if (events.length === 0) return <p>No events available. Create one to get started!</p>;

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
