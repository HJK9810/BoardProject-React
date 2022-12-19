import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import LogInService from "../service/LogInService";

function Login() {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    const axiosBody = {
      email: email,
      password: passwd,
    };

    LogInService.loginPost(axiosBody);
    navigate("/board");
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswd(e.target.value)} />
        </Form.Group>
      </Form>
      <button className="btn btn-primary" onClick={submit}>
        submit
      </button>
    </>
  );
}

export default Login;
