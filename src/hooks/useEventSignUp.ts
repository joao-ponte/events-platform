import { useAttendees } from "./useAttendees";
import { addEventToCalendar } from "../services/calendarService";
import { formatTimestamp } from "../utils/dateUtils";
import { Event } from "../types";

export const useEventSignUp = (event: Event, user: any) => {
  const { attendees, isSignedUp, addAttendee } = useAttendees(event, user);
  const { formattedDate, formattedTime } = formatTimestamp(event.timestamp);

  const handleSignUp = async () => {
    try {
      const confirmSignUp = window.confirm(
        `Do you want to sign up for the event "${event.title}"?`
      );

      if (!confirmSignUp) {
        return; 
      }

      await addAttendee();

      const addToCalendar = window.confirm(
        "Do you want to add this event to your Google Calendar?"
      );

      if (addToCalendar) {
        await addEventToCalendar(event);
      }
    } catch (error: any) {
      alert(error.message || "An error occurred during sign-up.");
    }
  };

  return { attendees, isSignedUp, handleSignUp, formattedDate, formattedTime };
};
