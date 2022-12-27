import React, {useState} from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import ModalView from "./Modal.layout";

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

      <ModalView show={show} message={"이미 로그아웃된 상태입니다.\u00a0\u00a0로그인 해 주세요."} clickFunc={() => setShow(false)} btnColor={"btn-danger"} />
    </Navbar>
  );
}

export default Header;
