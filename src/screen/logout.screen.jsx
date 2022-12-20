import {Container} from "react-bootstrap";
import {useCookies} from "react-cookie";
import Axios from "../Axios";
import jwtDecode from "jwt-decode";

function Logout() {
  const [cookie, setCookie, removeCookie] = useCookies([]);

  const logout = (e) => {
    Axios.get("/api/logout", jwtDecode(cookie.token).sub);

    removeCookie("token");
    removeCookie("refreshToken");

    window.location.href = "/login";
  };

  return (
    <Container>
      <h3>로그아웃 하시겠습니까?</h3>
      <button className="btn btn-secondary" style={{width: 100 + "%"}} onClick={logout}>
        로그아웃
      </button>
    </Container>
  );
}

export default Logout;
