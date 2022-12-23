import {useState} from "react";
import {Container, Form, Modal} from "react-bootstrap";
import Axios from "../Axios";
import {useCookies} from "react-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [cookie, setCookie] = useCookies([]);

  const [show, setShow] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const axiosBody = {
      email: email,
      password: passwd,
    };

    await Axios.post("/api/login", axiosBody).then((res) => {
      // user 존재 여부 체크
      if (!res.data.accessToken) {
        setEmail("");
        setPasswd("");
        setShow(true);
      } else {
        setCookie("token", res.data.accessToken);
        setCookie("exp", res.data.accessTokenExpiresIn);
        setCookie("refreshToken", res.data.refreshToken);
        Axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
        setLoginCheck(true);
      }
    });

    if (loginCheck) window.location.replace("/board");
  };

  const enterPress = (e) => {
    if (e.key === "Enter") {
      if (show) setShow(false);
      else submit(e);
    }
  };

  return (
    <Container onKeyDown={enterPress}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswd(e.target.value)} onKeyDown={enterPress} value={passwd} />
        </Form.Group>
      </Form>
      <button className="btn btn-info float-end" onClick={submit}>
        Login
      </button>

      <Modal show={show} onHide={() => setShow(false)} animation={false}>
        <Modal.Body className="text-center">등록되지 않은 사용자입니다. 다시 입력해 주세요.</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-warning" onClick={() => setShow(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Login;
