import {useState} from "react";
import {Container, Form} from "react-bootstrap";
import Axios from "../Axios";
import {useCookies} from "react-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [cookie, setCookie] = useCookies([]);

  const submit = async (e) => {
    e.preventDefault();

    const axiosBody = {
      email: email,
      password: passwd,
    };

    await Axios.post("/api/login", axiosBody).then((res) => {
      console.log(res.data.accessToken);
      if (!res.data.accessToken) return window.location.reload();

      setCookie("token", res.data.accessToken);
      setCookie("exp", res.data.accessTokenExpiresIn);
      setCookie("refreshToken", res.data.refreshToken);
      Axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
    });

    if (cookie.token !== "undefined") window.location.replace("/board");
  };

  const enterPress = (e) => {
    if (e.key === "Enter") submit(e);
  };

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswd(e.target.value)} onKeyDown={enterPress} />
        </Form.Group>
      </Form>
      <button className="btn btn-info float-end" onClick={submit}>
        Login
      </button>
    </Container>
  );
}

export default Login;
