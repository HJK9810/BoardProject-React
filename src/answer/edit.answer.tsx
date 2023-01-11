import {MouseEvent, useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Header from "../layout/Header";
import {ModalView} from "../layout/Modal.layout";
import BoardService from "../service/BoardService";
import {answerForm, errorForm} from "../service/Form";
import {Headlines} from "../service/Headlines";
import SetTokens from "../service/SetTokens";

function EditAnswer() {
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();
  const location = useLocation();

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
    BoardService.viewAnswerOne(Number(id))
      .then((res: answerForm) => setContents(res.contents))
      .catch((res) => navigate("/expire", {state: res.response.data}));
  }, [id, navigate]);

  const submit = async (e: MouseEvent) => {
    e.preventDefault();
    if (contents.length < 10) return setShow(true);
    else if (contents.length > 255) return setOver(true);

    await BoardService.editAnswer(Number(id), {contents: contents});
    navigate(`/viewOne/${location.state}`, {replace: true});
  };

  return (
    <div className="pt-5 container">
      <Header headline={Headlines.editAnswer} />
      <h3 className="pt-5">{Headlines.editAnswer}</h3>
      <form>
        <textarea className="form-control" rows={5} style={{resize: "none"}} value={contents} onChange={(e) => setContents(e.target.value)} />
      </form>
      <button className="btn btn-save my-3 widthMax" onClick={submit}>
        수정하기
      </button>

      <ModalView show={show} message={"글자수가 모자랍니다.\u00a0\u00a0더 입력해 주세요."} clickFunc={() => setShow(false)} btnColor={"btn-ok"} />
      <ModalView show={over} message={`글자수가 입력 가능한 수를 넘었습니다.\u00a0\u00a0글자수를 줄여주세요.`} clickFunc={() => setOver(false)} btnColor={"btn-ok"} />
    </div>
  );
}

export default EditAnswer;
