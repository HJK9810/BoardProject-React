import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";

function Header() {
  return (
    <header>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Container>
          <Navbar.Brand href="/">&lt; 문의사항</Navbar.Brand>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link eventKey={2} href="/logout">
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
