import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';




function Home() {
  return (
    <div>
      <h1>Welcome to Home</h1>
      <Link to="/signin">Sign In</Link> | <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default Home;
