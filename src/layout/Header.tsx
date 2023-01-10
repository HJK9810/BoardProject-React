import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {navProps} from "../service/Props";
import {ModalView} from "./Modal.layout";

function Header({headline}: Readonly<navProps>) {
  const navigate = useNavigate();
  const [cookie] = useCookies([]);
  const [show, setShow] = useState(false);

  const checkLogin = () => {
    if ("token" in cookie) {
      headline.includes("Log") ? navigate("/board") : navigate(-1);
    }
  };

  const checkLogoutAvail = () => {
    if ("token" in cookie) {
      navigate("/logout");
      window.location.reload();
    } else setShow(true);
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
      <div className="container">
        <span className="fs-6 fw-bold navbar-brand" onClick={checkLogin}>
          &lt; {headline}
        </span>
        <div className="navbar-nav">
          <a href="/login" data-rr-ui-event-key="/login" className="nav-link">
            Login
          </a>
          <div role="button" data-rr-ui-event-key={2} className="nav-link" onClick={checkLogoutAvail}>
            Logout
          </div>
        </div>
      </div>

      <ModalView show={show} message={"이미 로그아웃된 상태입니다.\u00a0\u00a0로그인 해 주세요."} clickFunc={() => setShow(false)} btnColor={"btn-danger"} />
    </nav>
  );
}

export default Header;
