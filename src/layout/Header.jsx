import React from "react";
import {Navbar, Container} from "react-bootstrap";

function Header() {
  return (
    <header>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Container>
          <Navbar.Brand href="/">&lt; 문의사항</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
