import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function EventCRUD() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", date: "", location: "", description: "" });

  // Fetch events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Add event
  const addEvent = async () => {
    try {
      const response = await axios.post("http://localhost:5000/events", newEvent);
      setEvents([...events, response.data]);
      setNewEvent({ name: "", date: "", location: "", description: "" });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/events/${id}`);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Event Management</h2>

      {/* Add Event Form */}
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Event Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
        <input type="date" className="form-control mt-2" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
        <input type="text" className="form-control mt-2" placeholder="Location" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
        <textarea className="form-control mt-2" placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}></textarea>
        <button className="btn btn-success mt-2" onClick={addEvent}>Add Event</button>
      </div>

      {/* Event List */}
      <ul className="list-group">
        {events.map((event) => (
          <li key={event.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{event.name}</h5>
              <p><strong>Date:</strong> {event.date} | <strong>Location:</strong> {event.location}</p>
              <p>{event.description}</p>
            </div>
            <button className="btn btn-danger" onClick={() => deleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventCRUD;
