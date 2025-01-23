import { useEffect, useState } from "react";
import { fetchEvents } from "../services/eventsApi";
import { EventCard } from "./EventCard";
import { Event } from "../types";
import "./eventCard.scss";

interface EventsListProps {
  user: any;
}

export function EventsList({ user }: EventsListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {events.map((e) => (
        <div className="container" key={e.id}>
          <EventCard event={e} user={user} />
        </div>
      ))}
    </div>
  );
}
