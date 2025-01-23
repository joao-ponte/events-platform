import { collection, getDocs, doc, getDoc, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../config/firebase";
import { Event } from "../types";

export async function fetchEvents(): Promise<Event[]> {
  const snapshot = await getDocs(collection(db, "events"));

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data() as Omit<Event, "id">;
    return {
      id: docSnap.id,
      ...data,
    };
  });
}

export async function fetchEventById(eventId: string): Promise<Event> {
  const docRef = doc(db, "events", eventId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error("Event not found");
  }

  const data = snapshot.data() as Omit<Event, "id">;
  return {
    id: snapshot.id,
    ...data,
  };
}

export async function createEvent(eventData: Omit<Event, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "events"), eventData);
  return docRef.id;
}

export async function addAttendeeToEvent(eventId: string, email: string): Promise<void> {
  const docRef = doc(db, "events", eventId);

  try {
    await updateDoc(docRef, {
      attendees: arrayUnion(email),
    });
    console.log("Attendee added successfully.");
  } catch (error) {
    console.error("Error adding attendee to event:", error);
    throw error;
  }
}

