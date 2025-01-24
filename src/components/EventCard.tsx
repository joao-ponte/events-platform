import { useState, useEffect } from "react";
import { Event } from "../types";
import { addAttendeeToEvent } from "../services/eventsApi";
import { initGoogleAPI, signInWithGoogle, addEventToGoogleCalendar } from "../config/googleCalendarUtils";
import "./eventCard.scss";

interface EventCardProps {
  event: Event;
  user: any;
}

export function EventCard({ event, user }: EventCardProps) {
  const [attendees, setAttendees] = useState<string[]>(event.attendees);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

  const eventDate = event.timestamp?.toDate();
  const formattedDate = eventDate
    ? eventDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Unknown Date";
  const formattedTime = eventDate
    ? eventDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unknown Time";

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

    try {
      await addAttendeeToEvent(event.id, user.email);
      setAttendees((prev) => [...prev, user.email]);
      setIsSignedUp(true);

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
            dateTime: eventDate?.toISOString() || "",
            timeZone: "Europe/London",
          },
          end: {
            dateTime: eventDate
              ? new Date(eventDate.getTime() + 60 * 60 * 1000).toISOString()
              : "",
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

  return (
    <div className="eventCard">
      <h1>{event.title}</h1>
      <p className="description">{event.description}</p>
      <p className="text">Date: {formattedDate}</p>
      <p className="text">Time: {formattedTime}</p>
      <p className="text">Location: {event.location}</p>
      <p className="text">
        Capacity: {attendees.length} / {event.capacity}
      </p>
      <div className="buttonContainer">
        <button
          className="signUpButton"
          onClick={handleSignUp}
          disabled={isSignedUp || attendees.length >= event.capacity}
        >
          {isSignedUp ? "Already Signed Up" : attendees.length >= event.capacity ? "Event Full" : "Sign up"}
        </button>
      </div>
    </div>
  );
}
