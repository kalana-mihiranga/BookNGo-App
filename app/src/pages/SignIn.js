import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/SignIn.css';

function SignIn() {
  // Set default values for email and password (username and password hints)
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a simple login process (you can replace this with actual authentication logic)
    if (email === "admin@example.com" && password === "admin123") {
      // Redirect to Admin Dashboard upon successful login
      navigate("/admin-dashboard");
    } else {
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>

      <p>Want to create an event? <Link to="/create-event">Click here</Link></p>

      <div className="signup-link">
        <p>New here? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default SignIn;
