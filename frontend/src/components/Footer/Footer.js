import React from "react";
import logo from "../../assets/box-service-image/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>&copy; 2023 Box-service.  <img src={logo} alt="logo" className="fot-logo"/>   All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
