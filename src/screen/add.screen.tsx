import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BoardService from "../service/BoardService";
import {useCookies} from "react-cookie";
import Header from "../layout/Header";
import {ModalConfirm, ModalView} from "../layout/Modal.layout";
import SetCookies from "../service/SetCookies";

function Add() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const navigate = useNavigate();

  const [cookie] = useCookies(["token", "refreshToken", "exp"]);
  const headline = "문의하기";
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const lastTime = cookie.exp - Date.now();
    if (lastTime < 0 && cookie.refreshToken) navigate("/expire");
    else if (lastTime < 1000 * 60 * 10) {
      // 만료 10분전
      const error: any = SetCookies.tokenRefresh(cookie.token, cookie.refreshToken);
      console.log(error.state);
      if (error.state) navigate("/expire", {state: error});
    }
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();
    if (title.length < 3) return setShow(true);
    if (contents.length < 10) return setShow(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("contents", contents);

    if (files) Object.values(files).map((file) => formData.append("images", file));

    await BoardService.addItem(formData, cookie.token).catch((err) => {
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
      <Header headline={headline} />
      <h2 className="p-3 pt-5 mb-1">{headline}</h2>
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

      <ModalView show={show} message={"글자수가 모자랍니다.\u00a0\u00a0더 입력해 주세요."} clickFunc={() => setShow(false)} btnColor={"btn-ok"} />
      <ModalConfirm
        id="0"
        show={error}
        message={"해당 파일을 저장할수 없습니다.\n파일을 저장하지 않고 질문을 등록하시겠습니까?"}
        clickFunc={(e: any) => submit(e)}
        cancleFunc={() => setError(false)}
      />
    </div>
  );
}

export default Add;
