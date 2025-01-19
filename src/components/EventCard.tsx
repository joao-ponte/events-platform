type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  // Add more fields as needed
};

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      {/* Or display other fields, like event.imageUrl */}
    </div>
  );
}
