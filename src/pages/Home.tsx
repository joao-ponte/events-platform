import { useState, useEffect } from "react";
import { EventsList } from "../components/EventsList";
import { signInWithGoogle, logOut } from "../config/firebase";
import { StaffLoginModal } from "../components/StaffLoginModal";
import { CreateEventModal } from "../components/CreateEventModal";
import { EditEventModal } from "../components/EditEventModal";
import { fetchEvents } from "../services/eventsApi";
import "./home.scss";

export function Home() {
  const [user, setUser] = useState<any>(null);
  const [isStaff, setIsStaff] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    loadEvents();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const { user, isStaff } = await signInWithGoogle();
      setUser(user);
      setIsStaff(isStaff);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setUser(null);
      setIsStaff(false);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

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
              <button className="sign-out-button" onClick={handleSignOut}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <button className="sign-in-button" onClick={handleGoogleSignIn}>
                User Login (Google)
              </button>
              <button className="staff-login-button" onClick={() => setShowLoginModal(true)}>
                Staff Login
              </button>
            </>
          )}
        </div>
      </header>

      <main>
        {isStaff && (
          <button className="create-event-button" onClick={() => setShowEventModal(true)}>
            Create Event
          </button>
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

      {showEventModal && (
        <CreateEventModal
          onClose={() => setShowEventModal(false)}
          onEventCreated={(newEvent) => setEvents((prevEvents) => [newEvent, ...prevEvents])} // Add new event to the top
        />
      )}

      {showEditModal && selectedEventId && (
        <EditEventModal
          eventId={selectedEventId}
          onClose={() => setShowEditModal(false)}
          onEventUpdated={(updatedEvent) => {
            setEvents((prevEvents) => {
              const filteredEvents = prevEvents.filter((event) => event.id !== updatedEvent.id);
              return [updatedEvent, ...filteredEvents]; // Move updated event to the top
            });
          }}
          onEventDeleted={(deletedEventId) => {
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== deletedEventId)); // Remove deleted event
          }}
        />
      )}
    </div>
  );
}
