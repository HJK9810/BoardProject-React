import {KeyboardEvent, MouseEvent, useState} from "react";
import Header from "../layout/Header";
import {ModalView} from "../layout/Modal.layout";
import {Headlines} from "../service/Headlines";
import SetTokens from "../service/SetTokens";

function Login() {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  const [show, setShow] = useState(false);
  const [eMessage, setEMessage] = useState("");

  const submit = async (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();

    await SetTokens.login({email: email, password: passwd})
      .then((res) => {
        SetTokens.refreshCookie(res);
        window.location.replace("/board");
      })
      .catch((res) => {
        // user 존재X
        setEMessage(res.response.data.message);
        setEmail("");
        setPasswd("");
        setShow(true);
      });
  };

  const enterPress = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!show) await submit(e);
      else setShow(false);
    }
  };

  return (
    <div className="pt-5 container" onKeyDown={enterPress}>
      <Header headline={Headlines.login} />
      <h2 className="text-center p-3 mt-5">{Headlines.login}</h2>
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
