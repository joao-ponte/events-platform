import { useState, useEffect } from "react";
import { fetchEvents } from "../services/eventsApi";

export function useEvents() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    loadEvents();
  }, []);

  const addEvent = (newEvent: any) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]); // Add to the top
  };

  const updateEvent = (updatedEvent: any) => {
    setEvents((prevEvents) => {
      const filteredEvents = prevEvents.filter((event) => event.id !== updatedEvent.id);
      return [updatedEvent, ...filteredEvents]; // Move updated event to the top
    });
  };

  const deleteEvent = (deletedEventId: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== deletedEventId));
  };

  return { events, addEvent, updateEvent, deleteEvent };
}
