import React, { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

const RegisterPage = () => {
  const { registerUser, isServerError } = useContext(AuthContext);

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    {
      firstName: "",
      lastName: "",
      username: "",
      phone_number: "",
      email: "",
      address: "",
    },
    registerUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError, reset]);

  return (
    <div className="lo-container">
      <div className="logbanner"></div>
      <div className="login-form">
        <form className="form" onSubmit={handleSubmit}>
          <h1>New member setup an account</h1>
          <div className="form-row"></div>
          <label className="form-label">
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleInputChange}
              placeholder="First Name"
              required
            />
          </label>
          <label className="form-label">
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleInputChange}
              placeholder="Last Name"
              required
            />
          </label>
          <label className="form-label">
            <input
              type="text"
              name="username"
              value={formData.username || ""}
              onChange={handleInputChange}
              placeholder="Username"
              autoComplete="username"
              required
            />
          </label>
          <label className="form-label">
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </label>
          <label className="form-label">
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
          </label>
          <label className="form-label">
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
              placeholder="Address"
              required
            />
          </label>
          <label className="form-label">
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number || ""}
              onChange={handleInputChange}
              maxLength="200"
              placeholder="Phone Number"
              required
            />
          </label>
          {isServerError ? (
            <p className="error">Registration failed, please try again.</p>
          ) : null}
          <button className="login-btn">Register!</button>
          <div className="divider">
            <span className="divider-text">or</span>
          </div>
          <p>Already have an account?</p>
          <Link to="/login" className="sign-up-btn">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
