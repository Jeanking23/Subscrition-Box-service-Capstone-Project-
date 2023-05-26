import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

const RegisterPage = () => {
  const { registerUser, isServerError } = useContext(AuthContext);
  const defaultValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    address: "",
    phoneNumber: ""
  };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    registerUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError, reset]);

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:{" "}
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone Number:{" "}
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </label>
        {isServerError ? (
          <p className="error">Registration failed, please try again.</p>
        ) : null}
        <button>Register!</button>
      </form>
    </div>
  );
};

export default RegisterPage;
