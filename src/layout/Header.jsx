import React, {useState} from "react";
import {Navbar, Container, Nav, Modal} from "react-bootstrap";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  const [cookie] = useCookies("[token]");
  const [show, setShow] = useState(false);

  const checkLogin = () => {
    if (cookie.hasOwnProperty("token")) {
      props.headline.includes("Log") ? navigate("/board") : navigate(-1);
    }
  };

  const checkLogoutAvail = () => {
    if (cookie.hasOwnProperty("token")) {
      navigate("/logout");
      window.location.reload();
    } else setShow(true);
  };

  return (
    <Navbar className="navbar navbar-expand-sm navbar-dark bg-dark" fixed="top">
      <Container>
        <Navbar.Brand onClick={checkLogin} className="fs-6 fw-bold">
          &lt; {props.headline}
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link eventKey={2} onClick={checkLogoutAvail}>
            Logout
          </Nav.Link>
        </Nav>
      </Container>

      <Modal show={show} onHide={() => setShow(false)} animation={false}>
        <Modal.Body className="text-center">이미 로그아웃된 상태입니다.&emsp;로그인 해 주세요.</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={() => setShow(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}

export default Header;
