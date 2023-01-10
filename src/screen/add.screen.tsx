import {MouseEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BoardService from "../service/BoardService";
import Header from "../layout/Header";
import {ModalConfirm, ModalView} from "../layout/Modal.layout";
import SetToknes from "../service/SetTokens";
import {Headlines} from "../service/Headlines";
import {errorForm} from "../service/Form";

function Add() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
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
        const error: errorForm | null = await SetToknes.tokenRefresh(localStorage.token, localStorage.refreshToken);
        if (error) navigate("/expire", {state: error});
      }
    };

    checkExpire(localStorage.exp - Date.now());
  }, [navigate]);

  const submit = async (e: MouseEvent) => {
    e.preventDefault();
    if (title.length < 3) {
      setMsg("제목");
      return setShow(true);
    }
    if (contents.length < 10) {
      setMsg("문의사항");
      return setShow(true);
    } else if (contents.length > 255) {
      setMsg("문의사항");
      return setOver(true);
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("contents", contents);

    if (files) Object.values(files).map((file) => formData.append("images", file));

    await BoardService.addItem(formData, localStorage.token).catch((err) => {
      const eData = err.response.data;
      if (eData.code === "FILE_NOT_SAVED") {
        setFiles(null);
        return setError(true);
      } else return navigate("/expire", {state: eData});
    });
    navigate("/board", {replace: true});
  };

  return (
    <div className="pt-5 container">
      <Header headline={Headlines.add} />
      <h2 className="p-3 pt-5 mb-1">{Headlines.add}</h2>
      <form>
        <div className="p-3 mt-1">
          <label className="form-label">제목</label>
          <input type="text" className="form-control" maxLength={256} placeholder="제목을 입력해주세요." onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="p-3 mt-1">
          <label className="form-label">첨부파일</label>
          <input type="file" className="form-control" multiple onChange={(e) => setFiles(e.target.files)} />
        </div>
        <div className="p-3 mt-1">
          <label className="form-label">문의사항</label>
          <textarea className="form-control" rows={5} style={{resize: "none"}} placeholder="내용을 입력해주세요." onChange={(e) => setContents(e.target.value)} />
        </div>
      </form>
      <button className="btn btn-save my-3 widthMax" onClick={submit}>
        문의 남기기
      </button>

      <ModalView show={show} message={`글자수가 모자랍니다.\u00a0\u00a0${msg}을 더 입력해 주세요.`} clickFunc={() => setShow(false)} btnColor={"btn-ok"} />
      <ModalView show={over} message={`글자수가 입력 가능한 수를 넘었습니다.\u00a0\u00a0${msg}을 줄여주세요.`} clickFunc={() => setOver(false)} btnColor={"btn-ok"} />
      <ModalConfirm
        show={error}
        message={"해당 파일을 저장할수 없습니다.\n파일을 저장하지 않고 질문을 등록하시겠습니까?"}
        clickFunc={(e: MouseEvent) => submit(e)}
        cancleFunc={() => setError(false)}
      />
    </div>
  );
}

export default Add;
