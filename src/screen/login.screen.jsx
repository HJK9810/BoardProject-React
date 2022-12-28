import {useState} from "react";
import {Container, Form} from "react-bootstrap";
import Axios from "../Axios";
import {useCookies} from "react-cookie";
import Header from "../layout/Header";
import {ModalView} from "../layout/Modal.layout";
import BoardService from "../service/BoardService";

function Login() {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [, setCookie] = useCookies([]);

  const [show, setShow] = useState(false);
  const [eMessage, setEMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    let loginCheck = false;

    const axiosBody = {
      email: email,
      password: passwd,
    };

    await BoardService.login(axiosBody).then((res) => {
      if (res.hasOwnProperty("code")) {
        // user 존재X
        setEMessage(res.message);
        setEmail("");
        setPasswd("");
        setShow(true);
      } else {
        setCookie("token", res.accessToken);
        setCookie("exp", res.accessTokenExpiresIn);
        setCookie("refreshToken", res.refreshToken);
        Axios.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;
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

      <ModalView show={show} message={`${eMessage}\u00a0\u00a0다시 입력해 주세요.`} clickFunc={() => setShow(false)} btnColor={"btn-warning"} />
    </Container>
  );
}

export default Login;
