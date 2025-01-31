import { useState } from "react";
import { EventsList } from "../components/EventsList";
import { StaffLoginModal } from "../components/StaffLoginModal";
import { ModalManager } from "../components/ModalManager";
import { useAuth } from "../hooks/useAuth";
import { useEvents } from "../hooks/useEvents";
import "./home.scss";

export function Home() {
  const { user, isStaff, handleGoogleSignIn, handleSignOut, setUser, setIsStaff } = useAuth();
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  return (
    <div className="home">
      <header className="header">
        <div className="logo-container">
          <img className="logo" src="../public/logo.svg" alt="My Events Platform Logo" />
          <h1>My Events Platform</h1>
        </div>
        <div className="auth-buttons">
          {user ? (
            <>
              <p className="welcome-message">Welcome, {user.email}!</p>
              <button className="sign-out-button" onClick={handleSignOut}>Sign out</button>
            </>
          ) : (
            <>
              <button className="sign-in-button" onClick={handleGoogleSignIn}>User Login (Google)</button>
              <button className="staff-login-button" onClick={() => setShowLoginModal(true)}>Staff Login</button>
            </>
          )}
        </div>
      </header>

      <main>
        {isStaff && (
          <button className="create-event-button" onClick={() => setShowEventModal(true)}>Create Event</button>
        )}

        <EventsList
          user={user}
          events={events}
          isStaff={isStaff}
          onEditEvent={(eventId) => {
            setSelectedEventId(eventId);
            setShowEditModal(true);
          }}
        />
      </main>

      {showLoginModal && (
        <StaffLoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={(user) => {
            setUser(user);
            setIsStaff(true);
          }}
        />
      )}

      <ModalManager
        showEventModal={showEventModal}
        showEditModal={showEditModal}
        selectedEventId={selectedEventId}
        onCloseCreateEvent={() => setShowEventModal(false)}
        onCloseEditEvent={() => setShowEditModal(false)}
        onEventCreated={addEvent}
        onEventUpdated={updateEvent}
        onEventDeleted={deleteEvent}
      />
    </div>
  );
}
