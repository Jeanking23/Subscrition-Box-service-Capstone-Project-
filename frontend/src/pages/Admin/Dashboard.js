import { Container, Nav } from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from "../../context/AuthContext.js";


const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  

  // Replace this with your admin access logic
  const isAdmin = currentUser && currentUser.isAdmin;

  if (!isAdmin) return <p>Access denied. Not an Admin!</p>;

  return (
    <Container fluid>
      <Nav className="flex-column">
        <h3>Quick Links</h3>
        <Nav.Link href="/admin/summary">Summary</Nav.Link>
        <Nav.Link href="/admin/products">Products</Nav.Link>
        <Nav.Link href="/admin/orders">Orders</Nav.Link>
        <Nav.Link href="/admin/users">Users</Nav.Link>
      </Nav>
      <div className="ml-5 mt-4">
        <Outlet />
      </div>
    </Container>
  );
};

export default Dashboard;
