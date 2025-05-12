import React from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";

// Common Pages
import Unauthorized from "./pages/common/Unauthorized";
import Contact from "./pages/common/Contact";
import AboutUs from "./pages/common/AboutUs";
import SignIn from "./pages/common/SignIn";
import SignUp from "./pages/common/SignUp";
import Home from "./pages/common/Home";
import Event from "./pages/common/Event";
import Landing from "./pages/common/Landing/Landing";
import Events from "./components/Events"; // Using existing Events component instead of EventsList

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Dashboard from "./pages/admin/Dashboard";
import Setting from "./pages/admin/Setting";
import EventManagement from "./pages/admin/EventManagement";
import UserManagement from "./pages/admin/UserManagement";

// Business Pages
import BusinessDashboard from "./pages/business/BusinessDashboard";
import ManageEvents from "./pages/business/ManageEvents";
import EventForm from "./components/EventForm"; // Using existing component
import EventCRUD from "./components/EventCRUD"; // Using existing component
import TourismDashboard from "./pages/business/DBoard";

// Tourist Pages
import Tourist from "./components/tourist/index";
import BookingHistory from "./components/tourist/BookedEvents";
import UserProfile from "./components/tourist/UserProfile";
import Payment from "./components/tourist/Payment";
import HomePage from "./components/home/HomePage";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={4000}
    >
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/event" element={<Event />} />
          <Route path="/previos" element={<Home />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Admin Protected Routes */}
          <Route path="/admin-dashboard" element={
            <AuthGuard requiredRole="ADMIN">
              <AdminDashboard />
            </AuthGuard>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="setting" element={<Setting />} />
            <Route path="approval" element={<EventManagement />} />
            <Route path="user-management" element={<UserManagement />} />
          </Route>

          {/* Business Protected Routes */}
          <Route path="/business-dashboard" element={
            <AuthGuard requiredRole="BUSINESS">
              <BusinessDashboard />
            </AuthGuard>
          } />
          <Route path="/manage-events" element={
            <AuthGuard requiredRole="BUSINESS">
              <ManageEvents />
            </AuthGuard>
          } />
          <Route path="/bd" element={
            <AuthGuard requiredRole="BUSINESS">
              <TourismDashboard />
            </AuthGuard>
          } />
          <Route path="/create-event" element={
            <AuthGuard requiredRole="BUSINESS">
              <EventForm />
            </AuthGuard>
          } />
          <Route path="/crud" element={
            <AuthGuard requiredRole="BUSINESS">
              <EventCRUD />
            </AuthGuard>
          } />

          {/* Tourist Protected Routes */}
          <Route path="/tourist" element={
            <AuthGuard requiredRole="TOURIST">
              <Tourist />
            </AuthGuard>
          } />
          <Route path="/booking-history" element={
            <AuthGuard requiredRole="TOURIST">
              <BookingHistory />
            </AuthGuard>
          } />

{/* 
          <Route path="/user-profile" element={
            <AuthGuard requiredRole="TOURIST">
              <UserProfile />
            </AuthGuard>
          } /> */}


  <Route path="/user-profile" element={<UserProfile />} />



          <Route path="/payment" element={
            <AuthGuard requiredRole="TOURIST">
              <Payment />
            </AuthGuard>
          } />
          <Route path="/payment/:eventId" element={
            <AuthGuard requiredRole="TOURIST">
              <Payment />
            </AuthGuard>
          } />
          <Route path="/home" element={
            <AuthGuard requiredRole="TOURIST">
              <HomePage />
            </AuthGuard>
          } />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;