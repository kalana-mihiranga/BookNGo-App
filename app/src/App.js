import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventForm from "./components/EventForm";
import Events from "./components/Events";
import Contact from "./pages/common/Contact";
import Tourist from "./components/tourist/index"
import HomePage from "./components/home/HomePage"
import BusinessDashboard from "./pages/BusinessDashboard";
import EventCRUD from "./components/EventCRUD";
import AboutUs from "./pages/common/AboutUs";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SignIn from "./pages/common/SignIn";
import SignUp from "./pages/common/SignUp";
import Payment from "./pages/tourist/Payment";
import Home from "./pages/common/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/business-dashboard" element={<BusinessDashboard />} /> {/* Business Dashboard */}
        <Route path="/crud" element={<EventCRUD />} />
      </Routes>
    </Router>
  );
}

export default App;
