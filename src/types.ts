export interface Event {
    id: string;           // Always present (doc.id)
    title: string;
    description: string;
    date: string;
    time?: string;
    location?: string;
    capacity?: number;
    createdBy?: string;
    attendees?: string[];
    imageUrl?: string;
}
  