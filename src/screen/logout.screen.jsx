import {Container} from "react-bootstrap";
import {useCookies} from "react-cookie";
import Axios from "../Axios";
import jwtDecode from "jwt-decode";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../layout/Header";
import {ModalView} from "../layout/Modal.layout";

function Logout() {
  const [cookie, , removeCookie] = useCookies([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const logout = (e) => {
    const name = jwtDecode(cookie.token).sub;
    Axios.get("/api/logout/" + name, name);

    removeCookie("token");
    removeCookie("refreshToken");

    setShow(true);
  };

  const logoutClear = () => {
    setShow(false);
    navigate("/login", {replace: true});
    window.location.reload();
  };

  const pressKey = (e) => {
    if (e.key === "Enter") {
      if (show) logoutClear();
      else logout();
    }
  };

  return (
    <Container className="pt-5" onKeyDown={pressKey}>
      <Header headline={"Logout"} />
      <h3 className="text-center p-3 mt-5">로그아웃 하시겠습니까?</h3>
      <button className="btn btn-danger mt-5" style={{width: 100 + "%"}} onClick={logout}>
        로그아웃
      </button>

      <ModalView show={show} message={"로그아웃 되었습니다."} clickFunc={logoutClear} btnColor={"btn-danger"} />
    </Container>
  );
}

export default Logout;
