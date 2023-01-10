import jwtDecode from "jwt-decode";
import {KeyboardEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../layout/Header";
import {ModalView} from "../layout/Modal.layout";
import {Headlines} from "../service/Headlines";
import {decodeForm} from "../service/Form";
import SetTokens from "../service/SetTokens";

function Logout() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token || localStorage.token === "error") {
      navigate("/login", {replace: true});
      window.location.reload();
    }
  }, [navigate]);

  const logout = () => {
    const decode: Readonly<decodeForm> = jwtDecode(localStorage.token);
    SetTokens.logout(decode.sub).catch(() => setShow(true));

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("exp");

    setShow(true);
  };

  const logoutClear = () => {
    setShow(false);
    navigate("/login", {replace: true});
    window.location.reload();
  };

  const pressKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (show) logoutClear();
      else logout();
    }
  };

  return (
    <div className="pt-5 container" onKeyDown={pressKey}>
      <Header headline={Headlines.logout} />
      <h2 className="text-center p-3 mt-5">로그아웃 하시겠습니까?</h2>
      <button className="btn btn-danger mt-5 widthMax" onClick={logout}>
        로그아웃
      </button>

      <ModalView show={show} message={"로그아웃 되었습니다."} clickFunc={logoutClear} btnColor={"btn-danger"} />
    </div>
  );
}

export default Logout;
