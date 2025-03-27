import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/business/BusinessDashboard.css";
import { Link } from "react-router-dom";

import { FaChartBar, FaCalendarAlt, FaUsers, FaPlus, } from "react-icons/fa";
// =======
// import { FaChartBar, FaCalendarAlt, FaUsers, FaPlus, FaCog } from "react-icons/fa";
// >>>>>>> main

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
          <li><FaChartBar /> <Link to="/dashboard">Dashboard</Link></li>
          <li><FaPlus /> <Link to="/create-event">Create Event</Link></li>
          <li><FaCalendarAlt /> <Link to="/manage-events">Manage Events</Link></li>
          <li><FaUsers /> <Link to="/view-bookings">View Bookings</Link></li>
// <<<<<<< development
// =======
//           <li><FaCog /> <Link to="/settings">Settings</Link></li>
// >>>>>>> main
        </ul>
      </aside>

      <main className="dashboard-main">
        <h1>Business Dashboard</h1>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <FaCalendarAlt className="stat-icon" />
            <h3>{events.length}</h3>
            <p>Total Events</p>
          </div>
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <h3>{bookings.length}</h3>
            <p>Total Bookings</p>
          </div>
        </div>

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