import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/common/SignIn.css';

function SignIn() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "admin123") {
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
