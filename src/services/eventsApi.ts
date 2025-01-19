import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../config/firebase"; 
import { Event } from "../types"; 

// Fetch all events:
export async function fetchEvents(): Promise<Event[]> {
    const snapshot = await getDocs(collection(db, "events"));
    
    return snapshot.docs.map(docSnap => {
      const data = docSnap.data() as Omit<Event, "id">;
      return {
        id: docSnap.id,
        ...data
      };
    });
  }

// Fetch single event by ID:
export async function fetchEventById(eventId: string): Promise<Event> {
    const docRef = doc(db, "events", eventId);
    const snapshot = await getDoc(docRef);
    
    if (!snapshot.exists()) {
      throw new Error("Event not found");
    }
  
    const data = snapshot.data() as Omit<Event, "id">;
    return {
      id: snapshot.id,
      ...data
    };
  }

// Add a new event:
export async function createEvent(eventData: Omit<Event, "id">): Promise<string> {
    const docRef = await addDoc(collection(db, "events"), eventData);
    return docRef.id; 
  }