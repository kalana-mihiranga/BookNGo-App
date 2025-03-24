import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/EventForm.css";

// User Profile Sidebar Component
const ProfileSidebar = ({ user, onClose }) => {
  return (
    <div className="profile-sidebar">
      <div className="profile-header">
        <button className="btn-close" onClick={onClose}>
          X
        </button>
      </div>
      <div className="profile-info">
        <img src={user.photoUrl} alt="User" className="profile-img" />
        <h4>{user.name}</h4>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
    </div>
  );
};

// Main EventForm Component
const EventForm = ({ onSubmit }) => {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    timeframe: "",
    duration: "",
    location: "",
    description: "",
    photo: null,
  });

  const [showProfile, setShowProfile] = useState(false);
  const [user] = useState({
    photoUrl: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Business Owner",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEventData({ ...eventData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(eventData);
    setEventData({
      name: "",
      date: "",
      timeframe: "",
      duration: "",
      location: "",
      description: "",
      photo: null,
    });
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="container event-form-container mt-4">
      <div className="header-section d-flex justify-content-between align-items-center">
        {/* User Profile */}
        <div className="user-profile" onClick={toggleProfile}>
          <img
            src={user.photoUrl}
            alt="User"
            className="profile-img"
          />
        </div>

        {/* Show profile details sidebar */}
        {showProfile && <ProfileSidebar user={user} onClose={toggleProfile} />}
      </div>

      <h2 className="mb-4 text-center">Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Event Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={eventData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Event Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={eventData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Timeframe</label>
          <select
            name="timeframe"
            className="form-control"
            value={eventData.timeframe}
            onChange={handleChange}
            required
          >
            <option value="">Select Timeframe</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Duration (in hours)</label>
          <input
            type="number"
            name="duration"
            className="form-control"
            value={eventData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={eventData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={eventData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Event Photo</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
