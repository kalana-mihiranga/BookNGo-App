import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EventForm from "./components/EventForm";
import Events from "./components/Events"; // Assuming this is for listing all events
import AboutUs from "./pages/AboutUs"; // Add About Us import
import Contact from "./pages/Contact"; // Add Contact import
import AdminDashboard from "./pages/AdminDashboard"; // Admin Dashboard import
import Payment from "./pages/Payment"; // Admin Dashboard import
import Tourist from "./components/tourist/index"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/events" element={<Events />} /> {/* This route should render Events component */}
        <Route path="/create-event" element={<EventForm />} /> {/* This route should render EventForm component */}
        <Route path="/about" element={<AboutUs />} /> {/* About Us Page */}
        <Route path="/contact" element={<Contact />} /> {/* Contact Page */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Admin Dashboard */}
        <Route path="/payment/:eventId" element={<Payment />} />
        <Route path="/tourist" element={<Tourist/>}/>
        
  

      </Routes>
    </Router>
  );
}

export default App;
