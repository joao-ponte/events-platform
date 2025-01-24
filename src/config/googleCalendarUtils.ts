import { gapi } from "gapi-script";

const CLIENT_ID = "1071208782844-q8bncbuivi74ep32shvj0jao6mpvq5pj.apps.googleusercontent.com";
const API_KEY = "AIzaSyBqL85LSkl-fPNwqUJ9HM59axikbJJpv8M";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export const initGoogleAPI = async () => {
  return new Promise<void>((resolve, reject) => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope: SCOPES,
        })
        .then(() => resolve())
        .catch((error: unknown) => reject(error));
    });
  });
};

export const signInWithGoogle = async () => {
  const auth = gapi.auth2.getAuthInstance();
  if (!auth.isSignedIn.get()) {
    await auth.signIn();
  }
  return auth.currentUser.get(); 
};

export const addEventToGoogleCalendar = async (event: {
  summary: string;
  description: string;
  location: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
}) => {
  try {
    const response = await gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    console.log("Event created: ", response.result);
    return response.result;
  } catch (error) {
    console.error("Error creating event: ", error);
    throw error;
  }
};