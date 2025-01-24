import { useState, useEffect } from "react";
import { addAttendeeToEvent } from "../services/eventsApi";
import { Event } from "../types";

export const useAttendees = (event: Event, user: any) => {
  const [attendees, setAttendees] = useState<string[]>(event.attendees);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

  useEffect(() => {
    if (user && attendees.includes(user.email)) {
      setIsSignedUp(true);
    }
  }, [user, attendees]);

  const addAttendee = async () => {
    if (!user) {
      throw new Error("Please sign in to register for this event.");
    }

    if (isSignedUp) {
      throw new Error("You are already signed up for this event.");
    }

    await addAttendeeToEvent(event.id, user.email);
    setAttendees((prev) => [...prev, user.email]);
    setIsSignedUp(true);
  };

  return { attendees, isSignedUp, addAttendee };
};
