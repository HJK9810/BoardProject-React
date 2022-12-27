import {useState} from "react";
import {Container, Form} from "react-bootstrap";
import Axios from "../Axios";
import {useCookies} from "react-cookie";
import Header from "../layout/Header";
import {ModalView} from "../layout/Modal.layout";

function Login() {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [, setCookie] = useCookies([]);

  const [show, setShow] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    let loginCheck = false;

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
        loginCheck = true;
      }
    });

    if (loginCheck) window.location.replace("/board");
  };

  const enterPress = async (e) => {
    if (e.key === "Enter") {
      if (!show) await submit(e);
      else setShow(false);
    }
  };

  return (
    <Container className="pt-5" onKeyDown={enterPress}>
      <Header headline={"Login"} />
      <h3 className="text-center p-3 mt-5">Login</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} autoFocus />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswd(e.target.value)} value={passwd} />
        </Form.Group>
      </Form>
      <button className="btn btn-info float-end" onClick={submit}>
        Login
      </button>

      <ModalView show={show} message={"등록되지 않은 사용자입니다.\u00a0\u00a0다시 입력해 주세요."} clickFunc={() => setShow(false)} btnColor={"btn-warning"} />
    </Container>
  );
}

export default Login;
