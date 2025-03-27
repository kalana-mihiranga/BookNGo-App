import React from "react";
import '../../styles/common/SignUp.css';

function SignUp() {
  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>

      <div className="signin-link">
        <p>Already have an account? <a href="/signin">Sign In</a></p>
      </div>
    </div>
  );
}

export default SignUp;
