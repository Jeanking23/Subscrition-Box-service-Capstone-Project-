import React from "react";
import {NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserCircle } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/box-service-image/logo.png";
import "./NavBar.css";
import { useContext } from "react";
import { Container, Row, Col, Button, Nav, NavItem} from "reactstrap";

const NavBar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <Nav className="nav">
      <Container className="nav-container">
        <Row className="row">
          <Col className="col">

            <NavLink className="logo" to="/">
              <img src={logo} alt="logo" className="logo"/>
            </NavLink>
          </Col>
          <Col className="col">
            <Nav className="ml-auto" navbar>
            <NavItem className="ul">
              <NavLink className="nav-link" to="/">HOME</NavLink>
            </NavItem>
              <NavItem className="ul">
                {user ? (
                  <Button onClick={handleLogout}>
                    <FontAwesomeIcon icon={faUserCircle} />
                    Logout
                  </Button>
                ) : (
                  <Button onClick={() => navigate("/login")} className="btn">
                  <FontAwesomeIcon icon={faUserCircle} className="custom-icon"/>
                    LOGIN
                  </Button>
                )}
                <Button onClick={() => navigate("/register")} className="btn">
                    SIGN UP
                  </Button>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Nav>
  );
};

export default NavBar;
