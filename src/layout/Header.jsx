import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const headerName = () => {
    const path = location.pathname;

    if (path.includes("board")) return "문의사항";
    else if (path.includes("view")) return "문의내역 조회";
    else if (path === "/add") return "문의하기";
    else if (path.includes("edit")) return "문의사항 수정";
    else if (path === "/addAnswer") return "답변하기";
    else return "";
  };

  return (
    <header>
      <Navbar className="navbar navbar-expand-sm navbar-dark bg-dark" fixed="top">
        <Container>
          <Navbar.Brand onClick={(e) => navigate(-1)}>&lt; {headerName()}</Navbar.Brand>
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
