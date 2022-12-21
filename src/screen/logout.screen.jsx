import {Container} from "react-bootstrap";
import {useCookies} from "react-cookie";
import Axios from "../Axios";
import jwtDecode from "jwt-decode";

function Logout() {
  const [cookie, , removeCookie] = useCookies([]);

  const logout = (e) => {
    const name = jwtDecode(cookie.token).sub;
    Axios.get("/api/logout/" + name, name);

    removeCookie("token");
    removeCookie("refreshToken");

    window.location.href = "/login";
  };

  return (
    <Container>
      <h3 className="text-center p-3 mt-5">로그아웃 하시겠습니까?</h3>
      <button className="btn btn-danger mt-5" style={{width: 100 + "%"}} onClick={logout}>
        로그아웃
      </button>
    </Container>
  );
}

export default Logout;
