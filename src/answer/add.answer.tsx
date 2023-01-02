import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../layout/Header";
import {ModalView} from "../layout/Modal.layout";
import BoardService from "../service/BoardService";
import SetCookies from "../service/SetCookies";

function AddAnswer() {
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  const [cookie] = useCookies(["token", "refreshToken", "exp"]);
  const headline = "답변하기";
  const [show, setShow] = useState(false);

  useEffect(() => {
    const lastTime = cookie.exp - Date.now();
    if (lastTime < 0 && cookie.refreshToken) navigate("/expire");
    else if (lastTime < 1000 * 60 * 10) {
      // 만료 10분전
      const error: any = SetCookies.tokenRefresh(cookie.token, cookie.refreshToken);
      if (error) navigate("/expire", {state: error});
    }
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();
    if (contents.length < 10) return setShow(true);

    await BoardService.addAnswer(Number(id), {contents: contents}, cookie.token);
    navigate(`/viewOne/${id}`, {replace: true});
  };

  return (
    <div className="pt-5 container">
      <Header headline={headline} />
      <h3 className="pt-5">{headline}</h3>
      <form>
        <label className="form-label">답변내용</label>
        <textarea className="form-control" rows={5} style={{resize: "none"}} onChange={(e) => setContents(e.target.value)} />
      </form>
      <button className="btn btn-save my-3 widthMax" onClick={submit}>
        답변 남기기
      </button>

      <ModalView show={show} message={"글자수가 모자랍니다.\u00a0\u00a0더 입력해 주세요."} clickFunc={() => setShow(false)} btnColor={"btn-ok"} />
    </div>
  );
}

export default AddAnswer;
