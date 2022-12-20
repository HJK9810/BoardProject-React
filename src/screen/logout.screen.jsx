import {Container} from "react-bootstrap";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

function Logout() {
  const [cookie, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  const logout = (e) => {
    removeCookie("token");
    navigate("/login");
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
