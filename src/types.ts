import { Timestamp } from "firebase/firestore";

export interface Event {
  id: string;
  title: string;
  description: string;
  timestamp: Timestamp;
  location: string;
  capacity: number;
  createdBy?: string;
  attendees: string[];
  imageUrl?: string;
}
