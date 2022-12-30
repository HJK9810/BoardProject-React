import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Axios from "../Axios";
import Header from "../layout/Header";
import {ModalView} from "../layout/Modal.layout";
import BoardService from "../service/BoardService";

function EditAnswer() {
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();
  const location = useLocation();

  const [cookie, setCookie] = useCookies(["token", "refreshToken", "exp"]);
  const headline = "답변수정하기";
  const [show, setShow] = useState(false);

  useEffect(() => {
    const lastTime = cookie.exp - Date.now();
    if (lastTime < 0 && cookie.refreshToken) navigate("/expire");
    else if (lastTime < 1000 * 60 * 10) tokenRefresh(cookie); // 만료 10분전
    BoardService.viewAnswerOne(Number(id), cookie.token).then((res) => setContents(res.contents));
  }, []);

  const tokenRefresh = async (cookie: any) => {
    const body = {
      accessToken: cookie.token,
      refreshToken: cookie.refreshToken,
    };

    // 토큰 갱신 서버통신
    await BoardService.refreshToken(body, cookie.token).then((res) => {
      if (res.hasOwnProperty("code")) navigate("/expire", {state: res});
      setCookie("refreshToken", res.refreshToken);
      setCookie("exp", res.accessTokenExpiresIn);
      setCookie("token", res.accessToken);
      Axios.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;
    });
  };

  const submit = async (e: any) => {
    e.preventDefault();
    if (contents.length < 10) return setShow(true);

    await BoardService.editAnswer(Number(id), {contents: contents}, cookie.token);
    navigate(`/viewOne/${location.state}`, {replace: true});
  };

  return (
    <div className="pt-5 container">
      <Header headline={headline} />
      <h3 className="pt-5">{headline}</h3>
      <form>
        <textarea className="form-control" rows={5} style={{resize: "none"}} value={contents} onChange={(e) => setContents(e.target.value)} />
      </form>
      <button className="btn btn-warning my-3 widthMax" onClick={submit}>
        수정하기
      </button>

      <ModalView show={show} message={"글자수가 모자랍니다.\u00a0\u00a0더 입력해 주세요."} clickFunc={() => setShow(false)} btnColor={"btn-warning"} />
    </div>
  );
}

export default EditAnswer;
