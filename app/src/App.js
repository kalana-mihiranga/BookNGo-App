import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventForm from "./components/EventForm";
import Events from "./components/Events";
import Contact from "./pages/common/Contact";
import Tourist from "./components/tourist/index"
import HomePage from "./components/home/HomePage"
import EventCRUD from "./components/EventCRUD";
import AboutUs from "./pages/common/AboutUs";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SignIn from "./pages/common/SignIn";
import SignUp from "./pages/common/SignUp";
import Home from "./pages/common/Home";
import BusinessDashboard from "./pages/business/BusinessDashboard";
import Event from "./pages/common/Event";
import BookingHistory from "./components/tourist/BookedEvents";
import UserProfile from "./components/tourist/UserProfile";
import ManageEvents from "./pages/business/ManageEvents";
import Payment from "./components/tourist/Payment";
import Landing from "./pages/common/Landing/Landing";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/previos" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/events" element={<Events />} /> 
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/payment/:eventId" element={<Payment />} />
        <Route path="/tourist" element={<Tourist/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/business-dashboard" element={<BusinessDashboard />} />
        <Route path="/crud" element={<EventCRUD />} />
        <Route path="/event" element={<Event />} />
        {/* common routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/user-profile" element={<UserProfile/>} />
        <Route path="/manage-events" element={<ManageEvents/>} />
        <Route path="/payment" element={<Payment/>} />





      </Routes>
    </Router>
  );
}

export default App;
