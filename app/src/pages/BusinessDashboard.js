import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BusinessDashboard.css";

const BusinessDashboard = () => {
  const [events] = useState([
    { id: 1, name: "Music Festival", date: "2025-06-15", location: "New York", attendees: 120 },
    { id: 2, name: "Food Carnival", date: "2025-07-20", location: "Los Angeles", attendees: 85 },
  ]);

  const [bookings] = useState([
    { id: 101, customer: "John Doe", event: "Music Festival", date: "2025-06-15" },
    { id: 102, customer: "Jane Smith", event: "Food Carnival", date: "2025-07-20" },
  ]);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Business Panel</h2>
        <ul>
          <li>Dashboard</li>
          <li>Create Event</li>
          <li>Manage Events</li>
          <li>View Bookings</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <h1>Business Dashboard</h1>

        <section className="events-section">
          <h2>Your Events</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Attendees</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>{event.attendees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="bookings-section">
          <h2>Recent Bookings</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Event</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.customer}</td>
                  <td>{booking.event}</td>
                  <td>{booking.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default BusinessDashboard;