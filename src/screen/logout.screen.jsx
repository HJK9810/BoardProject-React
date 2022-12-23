import {Container, Modal} from "react-bootstrap";
import {useCookies} from "react-cookie";
import Axios from "../Axios";
import jwtDecode from "jwt-decode";
import {useState} from "react";

function Logout() {
  const [cookie, , removeCookie] = useCookies([]);
  const [show, setShow] = useState(false);

  const logout = (e) => {
    const name = jwtDecode(cookie.token).sub;
    Axios.get("/api/logout/" + name, name);

    removeCookie("token");
    removeCookie("refreshToken");

    setShow(true);
  };

  const logoutClear = () => {
    setShow(false);
    window.location.replace("/login");
  };

  return (
    <Container>
      <h3 className="text-center p-3 mt-5">로그아웃 하시겠습니까?</h3>
      <button className="btn btn-danger mt-5" style={{width: 100 + "%"}} onClick={logout}>
        로그아웃
      </button>

      <Modal show={show} onHide={() => setShow(false)} animation={false}>
        <Modal.Body className="text-center">로그아웃 되었습니다.</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={logoutClear}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Logout;
