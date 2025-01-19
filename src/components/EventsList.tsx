import React from "react";
import { fetchEvents } from "../services/eventsApi";
import { EventCard } from "./EventCard";
import { Event } from "../types";

export function EventsList() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function getEvents() {
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {events.map(e => (
        <EventCard key={e.id} event={e} />
      ))}
    </div>
  );
}
