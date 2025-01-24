import { initGoogleAPI, signInWithGoogle, addEventToGoogleCalendar } from "../config/googleCalendarUtils";
import { Event } from "../types";

export const addEventToCalendar = async (event: Event): Promise<void> => {
  try {
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
  } catch (error) {
    console.error("Failed to add event to Google Calendar:", error);
    throw error;
  }
};
