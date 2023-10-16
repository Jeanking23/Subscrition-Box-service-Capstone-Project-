import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext.js";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = useMemo(() => ({ username: "", password: "" }), []);
  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const formErrors = {};
    if (!formData.username) {
      formErrors.username = "Username is required";
    }
    if (!formData.password) {
      formErrors.password = "Password is required";
    }

    // If there are errors, set them and return
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Call the login user function
    loginUser(formData);
  };

  useEffect(() => {
    if (isServerError) {
      setFormData(defaultValues);
    }
  }, [isServerError, defaultValues]);

  return (
    <div className="lo-container">
      <div className="logbanner"></div>
      <div className="login-form">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row"></div>
          <h1>Welcome Back</h1>
          <label className="form-label">
            <input
              type="text"
              name="username"
              value={formData.username}
              autoComplete="username"
              onChange={handleInputChange}
              placeholder="Username"
              required
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </label>
          <label className="form-label">
            <input
              type="password"
              name="password"
              value={formData.password}
              autoComplete="current-password"
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </label>
          {isServerError ? (
            <p className="error">Login failed, incorrect credentials!</p>
          ) : null}

          <button className="login-btn">Login</button>
          <div className="divider">
            <span className="divider-text">or</span>
          </div>
          <p>Not a member?</p>
          <Link to="/register" className="sign-up-btn">
            Sign up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
