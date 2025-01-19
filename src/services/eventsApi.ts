import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../config/firebase"; 

// Fetch all events:
export async function fetchEvents() {
  const snapshot = await getDocs(collection(db, "events"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Fetch single event by ID:
export async function fetchEventById(eventId: string) {
  const docRef = doc(db, "events", eventId);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  } else {
    throw new Error("Event not found");
  }
}

// Add a new event:
export async function createEvent(eventData: any) {
  const docRef = await addDoc(collection(db, "events"), eventData);
  return docRef.id; 
}