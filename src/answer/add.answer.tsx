import {MouseEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../layout/Header";
import {ModalView} from "../layout/Modal.layout";
import BoardService from "../service/BoardService";
import {errorForm} from "../service/Form";
import {Headlines} from "../service/Headlines";
import SetTokens from "../service/SetTokens";

function AddAnswer() {
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  const [show, setShow] = useState(false);
  const [over, setOver] = useState(false);

  useEffect(() => {
    if (!localStorage.token || localStorage.token === "error") {
      navigate("/login", {replace: true});
      window.location.reload();
    }

    const checkExpire = async (lastTime: number) => {
      if (lastTime < 0 && localStorage.refreshToken) navigate("/expire");
      else if (lastTime < 1000 * 60 * 10) {
        // 만료 10분전
        const error: errorForm | null = await SetTokens.tokenRefresh(localStorage.token, localStorage.refreshToken);
        if (error) navigate("/expire", {state: error});
      }
    };

    checkExpire(localStorage.exp - Date.now());
  }, [navigate]);

  const submit = async (e: MouseEvent) => {
    e.preventDefault();
    if (contents.length < 10) return setShow(true);
    else if (contents.length > 255) return setOver(true);

    await BoardService.addAnswer(Number(id), {contents: contents});
    navigate(`/viewOne/${id}`, {replace: true});
  };

  return (
    <div className="container">
      <Header headline={Headlines.addAnswer} />
      <h3 className="pt-5">{Headlines.addAnswer}</h3>
      <form>
        <label className="form-label">답변내용</label>
        <textarea className="form-control" rows={5} style={{resize: "none"}} onChange={(e) => setContents(e.target.value)} />
      </form>
      <button className="btn btn-save my-3 widthMax" onClick={submit}>
        답변 남기기
      </button>

      <ModalView show={show} message={"글자수가 모자랍니다.\u00a0\u00a0더 입력해 주세요."} clickFunc={() => setShow(false)} btnColor={"btn-ok"} />
      <ModalView show={over} message={`글자수가 입력 가능한 수를 넘었습니다.\u00a0\u00a0글자수를 줄여주세요.`} clickFunc={() => setOver(false)} btnColor={"btn-ok"} />
    </div>
  );
}

export default AddAnswer;
