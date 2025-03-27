import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiUser, FiCalendar, FiClock, FiMapPin, FiFileText, FiImage, FiX } from "react-icons/fi";
import "../styles/EventForm.css";

const ProfileSidebar = ({ user, onClose }) => {
  return (
    <div className="profile-sidebar shadow-lg">
      <div className="profile-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="mb-0">Profile Details</h5>
        <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>
          <FiX size={18} />
        </button>
      </div>
      <div className="profile-info p-4 text-center">
        <div className="profile-img-container mx-auto mb-3">
          <img src={user.photoUrl} alt="User" className="profile-img rounded-circle shadow" />
        </div>
        <h4 className="mb-2">{user.name}</h4>
        <p className="text-muted mb-1">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-muted">
          <strong>Role:</strong> {user.role}
        </p>
        <button className="btn btn-outline-primary mt-3">Edit Profile</button>
      </div>
    </div>
  );
};

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
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Johnathan Smith",
    email: "john.smith@business.com",
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
    <div className="container event-form-container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-0 pt-4">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0 text-primary">Create New Event</h2>
                <div className="user-profile" onClick={toggleProfile}>
                  <img
                    src={user.photoUrl}
                    alt="User"
                    className="profile-img rounded-circle shadow-sm"
                  />
                </div>
              </div>
              <p className="text-muted mt-2">Fill out the form below to create your event</p>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <FiFileText className="me-2" />
                    Event Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg"
                    placeholder="Enter event name"
                    value={eventData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-bold">
                      <FiCalendar className="me-2" />
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      className="form-control form-control-lg"
                      value={eventData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-bold">
                      <FiClock className="me-2" />
                      Timeframe
                    </label>
                    <select
                      name="timeframe"
                      className="form-select form-select-lg"
                      value={eventData.timeframe}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Timeframe</option>
                      <option value="Morning">Morning (8AM - 12PM)</option>
                      <option value="Afternoon">Afternoon (12PM - 5PM)</option>
                      <option value="Evening">Evening (5PM - 10PM)</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-bold">
                      <FiClock className="me-2" />
                      Duration (hours)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      className="form-control form-control-lg"
                      placeholder="2"
                      min="1"
                      max="12"
                      value={eventData.duration}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-bold">
                      <FiMapPin className="me-2" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      className="form-control form-control-lg"
                      placeholder="Enter event location"
                      value={eventData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <FiFileText className="me-2" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="form-control form-control-lg"
                    rows="4"
                    placeholder="Enter event description..."
                    value={eventData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <FiImage className="me-2" />
                    Event Photo
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                  <div className="form-text">Upload a high-quality image for your event</div>
                </div>

                <div className="d-grid gap-2 mt-4">
                  <button type="submit" className="btn btn-primary btn-lg py-3">
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showProfile && <ProfileSidebar user={user} onClose={toggleProfile} />}
    </div>
  );
};

export default EventForm;