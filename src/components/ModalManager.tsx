import { CreateEventModal } from "../components/CreateEventModal";
import { EditEventModal } from "../components/EditEventModal";

interface ModalManagerProps {
  showEventModal: boolean;
  showEditModal: boolean;
  selectedEventId: string | null;
  onCloseCreateEvent: () => void;
  onCloseEditEvent: () => void;
  onEventCreated: (newEvent: any) => void;
  onEventUpdated: (updatedEvent: any) => void;
  onEventDeleted: (deletedEventId: string) => void;
}

export function ModalManager({
  showEventModal,
  showEditModal,
  selectedEventId,
  onCloseCreateEvent,
  onCloseEditEvent,
  onEventCreated,
  onEventUpdated,
  onEventDeleted
}: ModalManagerProps) {
  return (
    <>
      {showEventModal && <CreateEventModal onClose={onCloseCreateEvent} onEventCreated={onEventCreated} />}
      {showEditModal && selectedEventId && (
        <EditEventModal
          eventId={selectedEventId}
          onClose={onCloseEditEvent}
          onEventUpdated={onEventUpdated}
          onEventDeleted={onEventDeleted}
        />
      )}
    </>
  );
}
