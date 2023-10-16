import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform admin authentication here (e.g., calling an API endpoint)
    // Replace the following code with your authentication logic

    if (username === "admin" && password === "password") {
      // Admin authentication successful
      navigate("/admin/dashboard");
    } else {
      // Admin authentication failed
      setError("Invalid username or password");
    }
  };

  return (
    <div className="lo-container">
    <div className="logbanner"></div>
    <div className="login-form">
      <form className="form" onSubmit={handleSubmit}>
      <h1>Admin Login</h1>
        <label className="form-label">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
            placeholder="Username"
          />
        </label>
        <label className="form-label">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Password"
          />
        </label>
        <button type="submit" className="login-btn">Login</button><div>
        Don't have an account? <Link to="/adminregister"  className="sign-up-btn">Register</Link>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default AdminLogin;
