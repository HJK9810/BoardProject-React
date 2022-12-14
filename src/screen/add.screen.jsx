import {useState} from "react";
import {Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import BoardService from "../service/BoardService";

function Add() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    console.log(files);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("contents", contents);

    Object.values(files).map((file) => formData.append("images", file));

    console.log("formData save");
    await BoardService.addItem(formData);
    console.log("save clear");
    navigate("/board");
  };

  return (
    <Container>
      <h3>문의하기</h3>
      <Form>
        <Form.Group>
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" maxLength={256} placeholder="제목을 입력해주세요." onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>첨부파일</Form.Label>
          <Form.Control type="file" multiple onChange={(e) => setFiles(e.target.files)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>상세내용</Form.Label>
          <Form.Control as="textarea" rows={5} style={{resize: "none"}} onChange={(e) => setContents(e.target.value)} />
        </Form.Group>
      </Form>
      <button className="btn btn-secondary mt-3" style={{width: 100 + "%"}} onClick={submit}>
        문의 남기기
      </button>
    </Container>
  );
}

export default Add;
