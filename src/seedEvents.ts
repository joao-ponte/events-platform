// src/seedEvents.ts
import { collection, addDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import { fakeEvents } from "./fakeEvents";

export async function seedFakeEvents() {
  const eventsRef = collection(db, "events");

  for (const event of fakeEvents) {
    try {
      const docRef = await addDoc(eventsRef, event);
      console.log("Event seeded with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }
}
