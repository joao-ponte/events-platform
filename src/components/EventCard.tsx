import { useState, useEffect } from "react";
import { Event } from "../types";
import { addAttendeeToEvent } from "../services/eventsApi";
import "./eventCard.scss";

interface EventCardProps {
  event: Event;
  user: any;
}

export function EventCard({ event, user }: EventCardProps) {
  const [attendees, setAttendees] = useState<string[]>(event.attendees);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

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
      alert(`Successfully signed up for ${event.title}!`);
    } catch (error) {
      console.error("Failed to sign up for the event:", error);
      alert("An error occurred while signing up. Please try again.");
    }
  };

  return (
    <div className="eventCard">
      <h1>{event.title}</h1>
      <p className="description">{event.description}</p>
      <p className="text">Date: {event.date}</p>
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
