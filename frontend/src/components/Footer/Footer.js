import React from 'react';
import logo from "../../assets/box-service-image/logo.png";
import './Footer.css';

const Footer = () => {
    return (
        <footer>
        <div className="footer">
            <div className="footer-content">
                <p>© 2024 Box Service. <img src={logo} alt="logo"  className="fot-logo"/> All rights reserved.</p>
            </div>
        </div>
    </footer>
    );

}

export default Footer;