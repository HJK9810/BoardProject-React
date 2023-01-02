import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BoardService from "../service/BoardService";
import {useCookies} from "react-cookie";
import ImageView from "./image.view";
import Header from "../layout/Header";
import {ModalConfirm, ModalView} from "../layout/Modal.layout";
import SetCookies from "../service/SetCookies";

function Edit() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const navigate = useNavigate();
  const {id} = useParams();

  const [cookie] = useCookies(["token", "refreshToken", "exp"]);
  const [image, setImage] = useState([]);
  const headline = "문의사항 수정";
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const lastTime = cookie.exp - Date.now();
    if (lastTime < 0 && cookie.refreshToken) navigate("/expire");
    else if (lastTime < 1000 * 60 * 10) tokenRefresh(cookie); // 만료 10분전

    BoardService.findOne(Number(id), cookie.token).then((res) => {
      if (res.hasOwnProperty("code")) navigate("/expire", {state: res});
      setTitle(res.title);
      setContents(res.contents);
      setImage(res.images ? res.images.split(",") : []);
    });
  }, []);

  const tokenRefresh = async (cookie: any) => {
    // 토큰 갱신 서버통신
    await BoardService.refreshToken({accessToken: cookie.token, refreshToken: cookie.refreshToken}).then((res) => {
      if (res.hasOwnProperty("code")) navigate("/expire", {state: res});

      SetCookies.refreshCookie(res);
    });
  };

  const submit = async (e: any) => {
    e.preventDefault();
    if (title.length < 3) return setShow(true);
    if (contents.length < 10) return setShow(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("contents", contents);
    formData.append("savedImages", image.join());

    if (files) Object.values(files).map((file) => formData.append("images", file));

    await BoardService.editItem(Number(id), formData, cookie.token).catch((err) => {
      const eData = err.response.data;
      if (eData.code === "FILE_NOT_SAVED") {
        setFiles(null);
        return setError(true);
      } else return navigate("/expire", {state: eData});
    });
    navigate(`/viewOne/${id}`, {replace: true});
  };

  const deleteQ = async (e: any) => {
    e.preventDefault();

    await BoardService.delItem(Number(id), cookie.token).catch((err) => navigate("/expire", {state: err.response.data}));
    navigate("/board", {replace: true});
  };

  return (
    <div className="pt-5 container">
      <Header headline={headline} />
      <h2 className="p-3 pt-5 mb-1">{headline}</h2>
      <form>
        <div className="p-3 mt-1">
          <label className="form-label">제목</label>
          <input type="text" className="form-control" maxLength={256} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="p-3 mt-1">
          <label className="form-label">첨부파일</label>
          <input type="file" className="form-control" multiple onChange={(e) => setFiles(e.target.files)} />
        </div>
        <h4 className="p-3 mb-1">기존 첨부파일</h4>
        <ImageView image={image} setImage={(p: any) => setImage(p)} check={true} />
        <div className="p-3 mt-1">
          <label className="form-label">문의사항</label>
          <textarea className="form-control" rows={5} style={{resize: "none"}} value={contents} onChange={(e) => setContents(e.target.value)} />
        </div>
      </form>
      <button className="btn btn-save my-3 widthMax" onClick={submit}>
        수정완료
      </button>
      <button className="btn btn-danger my-3 widthMax" onClick={(e) => setDel(true)}>
        문의 삭제하기
      </button>

      <ModalView show={show} message={"글자수가 모자랍니다.\u00a0\u00a0더 입력해 주세요."} clickFunc={() => setShow(false)} btnColor={"btn-ok"} />
      <ModalConfirm
        id={`${id}`}
        show={error}
        message={"해당 파일을 저장할수 없습니다.\n파일을 저장하지 않고 질문을 수정하시겠습니까?"}
        clickFunc={(e: any) => submit(e)}
        cancleFunc={() => setError(false)}
      />
      <ModalConfirm id={`${id}`} show={del} message={"해당 질문을 삭제하시겠습니까?\n질문 삭제시 답변 또한 모두 삭제됩니다."} clickFunc={(e: any) => deleteQ(e)} cancleFunc={() => setDel(false)} />
    </div>
  );
}

export default Edit;
