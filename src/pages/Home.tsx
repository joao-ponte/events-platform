import { EventsList } from "../components/EventsList";
import "./home.scss";

export function Home() {
  return (
    <div className="home">
      <header className="header">
        <div className="logo-container">
          <img className="logo" src="../public/logo.svg" alt="My Events Platform Logo" />
          <h1>My Events Platform</h1>
        </div>
        <button className="sign-in-button" aria-label="Sign in to your account">Sign in</button>
      </header>
      <main>
        <EventsList />
      </main>
    </div>
  );
}
