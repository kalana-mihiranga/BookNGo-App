import React from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Events from "./components/business/Events";
import Contact from "./pages/common/Contact";
import Tourist from "./components/tourist/index";
import HomePage from "./components/home/HomePage";
import EventCRUD from "./components/business/EventCRUD";
import AboutUs from "./pages/common/AboutUs";
import SignIn from "./pages/common/SignIn";
import SignUp from "./pages/common/SignUp";
import Home from "./pages/common/Home";
import BookingHistory from "./components/tourist/BookedEvents";
import UserProfile from "./components/tourist/UserProfile";
import ManageEvents from "./pages/business/ManageEvents";
import Payment from "./components/tourist/Payment";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Dashboard from "./pages/admin/Dashboard";
import Setting from "./pages/admin/Setting";
import EventManagement from "./pages/admin/EventManagement";
import UserManagement from "./pages/admin/UserManagement";
import BusinessManagement from "./pages/admin/BusinessManagement";
import AuthGuard from "./components/AuthGuard";
import Event from "./components/tourist/Event";
import Landing from "./components/tourist/Landing";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={4000}
    >
      <Router>
        <Routes>
          <Route path="/previos" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment/:eventId" element={<Payment />} />
          <Route path="/tourist" element={<Tourist />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/crud" element={<EventCRUD />} />
          <Route path="/event" element={<Event />} />
          {/* common routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/user-profile" element={<UserProfile />} />
           <Route path="/manage-events" element={
            // <AuthGuard requiredRole="BUSINESS">
              <ManageEvents />
            // </AuthGuard>
          } />
          {/* admin routes */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/admin" element={
            // <AuthGuard requiredRole="ADMIN">
              <AdminDashboard />
            //  </AuthGuard>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="setting" element={<Setting />} />
            <Route path="approval" element={<EventManagement />} />
            <Route path="event-management" element={<UserManagement />} />
            <Route path="business-management" element={<BusinessManagement />} />
          </Route>
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
