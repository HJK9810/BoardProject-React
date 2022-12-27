import {useEffect, useState} from "react";
import {Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import BoardService from "../service/BoardService";
import {useCookies} from "react-cookie";
import Header from "../layout/Header";
import {ModalView} from "../layout/Modal.layout";

function Add() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const [cookie] = useCookies(["token"]);
  const headline = "문의하기";
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (cookie.exp - Date.now() < 0 && cookie.refreshToken) navigate("/expire");
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (title.length < 3) return setShow(true);
    if (contents.length < 10) return setShow(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("contents", contents);

    Object.values(files).map((file) => formData.append("images", file));

    await BoardService.addItem(formData, cookie.token);
    navigate("/board", {replace: true});
  };

  return (
    <Container className="pt-5">
      <Header headline={headline} />
      <h3 className="p-3 pt-5 mb-1">{headline}</h3>
      <Form>
        <Form.Group className="p-3 mt-1">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" maxLength={256} placeholder="제목을 입력해주세요." onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="p-3 mt-1">
          <Form.Label>첨부파일</Form.Label>
          <Form.Control type="file" multiple onChange={(e) => setFiles(e.target.files)} />
        </Form.Group>
        <Form.Group className="p-3 mt-1">
          <Form.Label>상세내용</Form.Label>
          <Form.Control as="textarea" rows={5} style={{resize: "none"}} onChange={(e) => setContents(e.target.value)} />
        </Form.Group>
      </Form>
      <button className="btn btn-warning my-3" style={{width: 100 + "%"}} onClick={submit}>
        문의 남기기
      </button>

      <ModalView show={show} message={"글자수가 모자랍니다.\u00a0\u00a0더 입력해 주세요."} clickFunc={() => setShow(false)} btnColor={"btn-warning"} />
    </Container>
  );
}

export default Add;
