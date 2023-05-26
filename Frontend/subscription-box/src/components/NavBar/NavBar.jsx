import React from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import {
    Container, Row, Col, Button, Navbar, Nav,
    NavbarBrand, NavItem, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap';

  const NavBar = () => {
    const { logoutUser, user } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
      <Navbar color="light" light expand="md">
        <Container>
          <Row>
            <Col>
              <Link to="/">
                <NavbarBrand className="mr-auto">
                  <img
                    src={"/ERD & wireframe/box-service-image/logo.png"}
                    alt="logo"
                  />
                </NavbarBrand>
              </Link>
            </Col>
            <Col>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {user ? (
                    <Button onClick={logoutUser}>Logout</Button>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="btn"
                    >
                      Login
                    </button>
                  )}
                </NavItem>
                <NavItem>
                  <Link to="/Register">Sign Up</Link>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {/* <img src={user.avatar} alt="avatar" /> */}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={() => logoutUser()}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>
    );
  };
  
  export default NavBar;
        