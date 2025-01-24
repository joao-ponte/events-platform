import { useState, useEffect } from "react";
import { addAttendeeToEvent } from "../services/eventsApi";
import { initGoogleAPI, signInWithGoogle, addEventToGoogleCalendar } from "../config/googleCalendarUtils";
import { formatTimestamp } from "../utils/dateUtils";
import { Event } from "../types";

export const useEventSignUp = (event: Event, user: any) => {
  const [attendees, setAttendees] = useState<string[]>(event.attendees);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

  // Format date and time
  const { formattedDate, formattedTime } = formatTimestamp(event.timestamp);

  useEffect(() => {
    if (user && attendees.includes(user.email)) {
      setIsSignedUp(true);
    }
  }, [user, attendees]);

  const handleSignUp = async () => {
    if (!user) {
      alert("Please sign in to register for this event.");
      return;
    }
  
    if (isSignedUp) {
      alert("You are already signed up for this event.");
      return;
    }
  
    // Add a confirmation dialog
    const confirmSignUp = window.confirm(
      `Do you want to sign up for the event "${event.title}"?`
    );
  
    if (!confirmSignUp) {
      return; // Exit if the user cancels
    }
  
    try {
      // Add attendee to the Firestore database
      await addAttendeeToEvent(event.id, user.email);
      setAttendees((prev) => [...prev, user.email]);
      setIsSignedUp(true);
  
      // Ask the user if they want to add the event to Google Calendar
      const addToCalendar = window.confirm(
        "Do you want to add this event to your Google Calendar?"
      );
  
      if (addToCalendar) {
        await initGoogleAPI();
        await signInWithGoogle();
  
        const eventDetails = {
          summary: event.title,
          description: event.description,
          location: event.location || "",
          start: {
            dateTime: event.timestamp.toDate().toISOString(),
            timeZone: "Europe/London",
          },
          end: {
            dateTime: new Date(
              event.timestamp.toDate().getTime() + 60 * 60 * 1000
            ).toISOString(),
            timeZone: "Europe/London",
          },
        };
  
        await addEventToGoogleCalendar(eventDetails);
  
        alert(`Event successfully added to your Google Calendar! Event: ${event.title}`);
      }
    } catch (error) {
      console.error("Failed to sign up or add to Google Calendar:", error);
      alert("An error occurred while signing up. Please try again.");
    }
  };  

  return {
    attendees,
    isSignedUp,
    handleSignUp,
    formattedDate,
    formattedTime,
  };
};
