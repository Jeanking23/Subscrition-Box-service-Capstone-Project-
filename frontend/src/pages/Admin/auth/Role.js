import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminLogin from "./Adminlogin";
import Login from "../../LoginPage/LoginPage";
import bannershop from "../../../assets/box-service-image/bannershop.jpeg";

const LoginUser = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const navigateToPage = () => {
    if (selectedRole === "admin") {
      window.open("/admin/dashboard", "_blank");
    } else if (selectedRole === "user") {
      window.open("/home", "_blank");
    }
  };

  return (
    <div
      className="lo-container"
      style={{
        backgroundImage: `url(${bannershop})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="login-form">
        <form
          style={{
            border: "1px solid #ccc",
            boxShadow: "0 2px 4px rgba(0, 0, 1, 0.1)",
            margin: "50px",
            padding: "70px 50px",
            borderRadius: "10px",
            backgroundColor: "#0f23",
            width: "400px",
          }}
        >
          <h1>Login As</h1>
          <label className="form-label">
            Role:
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              style={{
                padding: "10px",
                borderRadius: "5px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
          {selectedRole === "admin" && <AdminLogin />}
          {selectedRole === "user" && <Login />}
          {selectedRole && (
            <div>
              Don't have an account?{" "}
              <Link to={`/register/${selectedRole}`} className="sign-up-btn">
                Register
              </Link>
            </div>
          )}
          {selectedRole && (
            <button className="login-btn" onClick={navigateToPage}>
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
