import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../../styles/admin/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <div className="sidebar p-0">
        <div className="sidebar-header">
          <div className="m-3 d-flex flex-row justify-content-start align-items-center">
            <img
              className="profile-pic m-0 ms-0"
              src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Profile"
            />
            <div>
              <p className="user-name pb-0 mb-0">Nuwan Saranath</p>
              <p className="email pb-0 mb-0">nuwansaranath@gmail.com</p>
            </div>
          </div>
        </div>

        <ul className="sidebar-menu pt-0 mt-0">
          <li>
            <button
              className="sidebar-menu-link"
              onClick={() => navigate("/admin-dashboard/dashboard")}
            >
              <i className="bi bi-house-door-fill"></i> Dashboard
            </button>
          </li>
          <li>
            <button
              className="sidebar-menu-link"
              onClick={() => navigate("/events")}
            >
              <i className="bi bi-calendar-event"></i> Manage Events
            </button>
          </li>
          <li>
            <button
              className="sidebar-menu-link"
              onClick={() => navigate("/businesses")}
            >
              <i className="bi bi-building"></i> Businesses
            </button>
          </li>
          <li>
            <button
              className="sidebar-menu-link"
              onClick={() => navigate("/admin-dashboard/setting")}
            >
              <i className="bi bi-gear-fill"></i> Settings
            </button>
          </li>
        </ul>
      </div>

      <div className="dashboard-content">
        <div className="header">
          <div className="header-right">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
