import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Event Booking Platform</h1>
        <p>Book exciting events, discover new experiences, and more!</p>
        <div className="cta-buttons">
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>

      <div className="links-container">
        <p>Explore:</p>
        <Link to="/events">Browse Events</Link> | <Link to="/create-event">Create Event</Link>
      </div>

      <div className="footer">
        <p>&copy; 2025 Event Booking Inc. | <Link to="/about">About Us</Link> | <Link to="/contact">Contact</Link></p>
      </div>
    </div>
  );
}

export default Home;
