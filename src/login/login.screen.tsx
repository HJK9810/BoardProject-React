import {useState} from "react";
import Axios from "../Axios";
import {useCookies} from "react-cookie";
import Header from "../layout/Header";
import {ModalView} from "../layout/Modal.layout";
import BoardService from "../service/BoardService";

function Login() {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [, setCookie] = useCookies(["token", "refreshToken", "exp"]);

  const [show, setShow] = useState(false);
  const [eMessage, setEMessage] = useState("");

  const submit = async (e: any) => {
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

  const enterPress = async (e: any) => {
    if (e.key === "Enter") {
      if (!show) await submit(e);
      else setShow(false);
    }
  };

  return (
    <div className="pt-5 container" onKeyDown={enterPress}>
      <Header headline={"Login"} />
      <h2 className="text-center p-3 mt-5">Login</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">User</label>
          <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} autoFocus />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPasswd(e.target.value)} value={passwd} />
        </div>
      </form>
      <button className="btn btn-ok float-end" onClick={submit}>
        Login
      </button>

      <ModalView show={show} message={`${eMessage}\u00a0\u00a0다시 입력해 주세요.`} clickFunc={() => setShow(false)} btnColor={"btn-ok"} />
    </div>
  );
}

export default Login;
