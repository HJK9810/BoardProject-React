import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {ModalView} from "./Modal.layout";

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
    <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
      <div className="container">
        <span className="fs-6 fw-bold navbar-brand" onClick={checkLogin}>
          &lt; {props.headline}
        </span>
        <div className="navbar-nav">
          <a href="/login" data-rr-ui-event-key="/login" className="nav-link">
            Login
          </a>
          <a role="button" data-rr-ui-event-key={2} className="nav-link" onClick={checkLogoutAvail}>
            Logout
          </a>
        </div>
      </div>

      <ModalView show={show} message={"이미 로그아웃된 상태입니다.\u00a0\u00a0로그인 해 주세요."} clickFunc={() => setShow(false)} btnColor={"btn-danger"} />
    </nav>
  );
}

export default Header;
