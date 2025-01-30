import { useState } from "react";
import { EventsList } from "../components/EventsList";
import { signInWithGoogle, logOut } from "../config/firebase";
import { StaffLoginModal } from "../components/StaffLoginModal";
import { CreateEventModal } from "../components/CreateEventModal";
import "./home.scss";

export function Home() {
  const [user, setUser] = useState<any>(null);
  const [isStaff, setIsStaff] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [refreshEvents, setRefreshEvents] = useState<boolean>(false);
  
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
            Create Events
          </button>
        )}
        <EventsList user={user} refresh={refreshEvents} />
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
          onEventCreated={() => setRefreshEvents(!refreshEvents)} 
        />
      )}
    </div>
  );
}
