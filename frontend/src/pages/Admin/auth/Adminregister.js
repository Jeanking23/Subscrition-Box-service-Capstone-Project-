import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useCustomForm from "../../../hooks/useCustomForm";
import axios from "axios";
import "../../LoginPage/LoginPage.css";

const Admin = () => {
  const navigate = useNavigate();
  const [auth] = useState(null);
  const initialValues = {
    // initial form values
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "admin",
    phone: "",
    address: "",
    city: "",
    phoneNumber: ""
  };

  useEffect(() => {
    if (auth && auth._id) {
      navigate("/admin");
    }
  }, [auth, navigate]);

  const onSubmit = (data) => {
    // Send the form data to the backend API
    axios
      .post("/api/auth/admin", data)
      .then((response) => {
        console.log(response.data);
        if (data.role === "admin") {
          navigate("/admin");
        } else if (data.role === "user") {
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error as needed
      });
  };

  const [formData, handleChange, handleSubmit, reset] = useCustomForm(
    initialValues,
    onSubmit
  );

  return (
    <div className="lo-container">
     <div className="logbanner"></div>
      <div className="login-form"></div>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Admin</h1>
        <div className="form-row"></div>
        <label className="form-label">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </label>
        <label className="form-label">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </label>
        <label className="form-label">
          <input
            type="password"
            name="password"
            value={formData.password}
            autoComplete="current-password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </label>
        <label className="form-label">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </label>
        <label className="form-label">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </label>
        <label className="form-label">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </label>
        <label className="form-label">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
          />
        </label>

        <button className="login-btn" type="submit">
          Submit
        </button>
        <button className="sign-up-btn" onClick={reset}>
          Reset
        </button>
        <div>
          Already registered? <Link to="/Adminlogin"  className="sign-up-btn">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Admin;
