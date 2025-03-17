import React from "react";
import '../styles/SignIn.css';
function SignIn() {
  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default SignIn;
