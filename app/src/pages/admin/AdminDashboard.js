import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/admin/AdminDashboard.css';

const mockEventRequests = [
  { id: 1, name: "Music Concert", date: "2025-04-10", location: "New York", status: "Pending" },
  { id: 2, name: "Food Festival", date: "2025-04-12", location: "Los Angeles", status: "Pending" }
];

const mockBusinessRequests = [
  { id: 1, name: "ABC Events", type: "Event Organizer", status: "Pending" },
  { id: 2, name: "XYZ Catering", type: "Catering Service", status: "Pending" }
];

function AdminDashboard() {
  const [eventRequests, setEventRequests] = useState(mockEventRequests);
  const [businessRequests, setBusinessRequests] = useState(mockBusinessRequests);
  const navigate = useNavigate(); // using react-router's useNavigate hook for navigation

  const handleEventRequest = (id, action) => {
    setEventRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: action } : request
      )
    );
  };

  const handleBusinessRequest = (id, action) => {
    setBusinessRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: action } : request
      )
    );
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <ul className="sidebar-menu">
          <li><button className="sidebar-menu-link" onClick={() => navigate('/dashboard')}>Dashboard</button></li>
          <li><button className="sidebar-menu-link" onClick={() => navigate('/events')}>Manage Events</button></li>
          <li><button className="sidebar-menu-link" onClick={() => navigate('/businesses')}>Manage Businesses</button></li>
          <li><button className="sidebar-menu-link" onClick={() => navigate('/settings')}>Settings</button></li>
        </ul>
      </div>

      <div className="dashboard-content">
        <div className="header">
          <div className="header-right">
            <p>Welcome, Admin</p>
            <button className="profile-btn">Profile</button>
          </div>
        </div>

        <div className="requests-container">
          <div className="request-card event-requests">
            <h3>Event Creation Requests</h3>
            <div className="request-list">
              {eventRequests.map(request => (
                <div key={request.id} className="request-item">
                  <p><strong>Event:</strong> {request.name}</p>
                  <p><strong>Date:</strong> {request.date}</p>
                  <p><strong>Location:</strong> {request.location}</p>
                  <p><strong>Status:</strong> {request.status}</p>
                  <button onClick={() => handleEventRequest(request.id, "Approved")} className="approve-btn">Approve</button>
                  <button onClick={() => handleEventRequest(request.id, "Rejected")} className="reject-btn">Reject</button>
                </div>
              ))}
            </div>
          </div>

          <div className="request-card business-requests">
            <h3>Business Creation Requests</h3>
            <div className="request-list">
              {businessRequests.map(request => (
                <div key={request.id} className="request-item">
                  <p><strong>Business:</strong> {request.name}</p>
                  <p><strong>Type:</strong> {request.type}</p>
                  <p><strong>Status:</strong> {request.status}</p>
                  <button onClick={() => handleBusinessRequest(request.id, "Approved")} className="approve-btn">Approve</button>
                  <button onClick={() => handleBusinessRequest(request.id, "Rejected")} className="reject-btn">Reject</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
