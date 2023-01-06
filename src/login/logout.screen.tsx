import {useCookies} from "react-cookie";
import Axios from "../Axios";
import jwtDecode from "jwt-decode";
import {KeyboardEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../layout/Header";
import {ModalView} from "../layout/Modal.layout";
import {Headlines} from "../service/Headlines";
import {decodeForm} from "../service/Form";

function Logout() {
  const [cookie, , removeCookie] = useCookies(["token", "refreshToken", "exp"]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    const decode: decodeForm = jwtDecode(cookie.token);
    Axios.get("/api/logout/" + decode.sub).catch(() => setShow(true));

    removeCookie("token");
    removeCookie("refreshToken");

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
