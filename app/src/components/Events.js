import React, { useState, useEffect } from "react";
import '../styles/Events.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    // Fetch events from API or database (for now, use a mock array)
    setEvents([
      { id: 1, name: "Music Festival", date: "2025-06-15", location: "New York", description: "A grand music festival." },
      { id: 2, name: "Food Carnival", date: "2025-07-20", location: "Los Angeles", description: "A carnival with great food!" },
      { id: 3, name: "Tech Conference", date: "2025-08-25", location: "San Francisco", description: "The latest in tech innovation." },
    ]);
  }, []);

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchQuery({
      ...searchQuery,
      [name]: value,
    });
  };

  const filteredEvents = events.filter((event) => {
    return (
      event.name.toLowerCase().includes(searchQuery.name.toLowerCase()) &&
      event.date.includes(searchQuery.date) &&
      event.location.toLowerCase().includes(searchQuery.location.toLowerCase())
    );
  });

  return (
    <div className="events-container">
      <h1>Browse All Events</h1>
      
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by event name"
          name="name"
          value={searchQuery.name}
          onChange={handleSearch}
        />
        <input
          type="date"
          name="date"
          value={searchQuery.date}
          onChange={handleSearch}
        />
        <input
          type="text"
          placeholder="Search by location"
          name="location"
          value={searchQuery.location}
          onChange={handleSearch}
        />
      </div>

      <div className="event-list">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p>{event.description}</p>
            <button>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
