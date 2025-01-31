import { gapi } from "gapi-script";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SCOPES = import.meta.env.VITE_GOOGLE_SCOPES;

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
  try {
    const auth = gapi.auth2.getAuthInstance();
    if (!auth.isSignedIn.get()) {
      await auth.signIn({ prompt: "select_account" });
    }
    const user = auth.currentUser.get();

    return {
      email: user.getBasicProfile().getEmail(),
      name: user.getBasicProfile().getName(),
      token: user.getAuthResponse().id_token,
    };
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
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
