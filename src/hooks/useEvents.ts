import { useState, useEffect } from "react";
import { fetchEvents } from "../services/eventsApi";
import { Event } from "../types";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true); 
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); 
      }
    };

    loadEvents();
  }, []);

  const addEvent = (newEvent: Event) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents((prevEvents) => {
      const filteredEvents = prevEvents.filter((event) => event.id !== updatedEvent.id);
      return [updatedEvent, ...filteredEvents];
    });
  };

  const deleteEvent = (deletedEventId: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== deletedEventId));
  };

  return { events, loading, addEvent, updateEvent, deleteEvent };
}
