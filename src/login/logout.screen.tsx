import {useCookies} from "react-cookie";
import Axios from "../Axios";
import jwtDecode from "jwt-decode";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../layout/Header";
import {ModalView} from "../layout/Modal.layout";

function Logout() {
  const [cookie, , removeCookie] = useCookies(["token", "refreshToken", "exp"]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const logout = (e: any) => {
    const decode: any = jwtDecode(cookie.token);
    Axios.get("/api/logout/" + decode.sub, decode.sub).catch((err) => setShow(true));

    removeCookie("token");
    removeCookie("refreshToken");

    setShow(true);
  };

  const logoutClear = () => {
    setShow(false);
    navigate("/login", {replace: true});
    window.location.reload();
  };

  const pressKey = (e: any) => {
    if (e.key === "Enter") {
      if (show) logoutClear();
      else logout(e);
    }
  };

  return (
    <div className="pt-5 container" onKeyDown={pressKey}>
      <Header headline={"Logout"} />
      <h3 className="text-center p-3 mt-5">로그아웃 하시겠습니까?</h3>
      <button className="btn btn-danger mt-5 widthMax" onClick={logout}>
        로그아웃
      </button>

      <ModalView show={show} message={"로그아웃 되었습니다."} clickFunc={logoutClear} btnColor={"btn-danger"} />
    </div>
  );
}

export default Logout;
