import {useEffect, useState} from "react";
import {Container, Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import BoardService from "../service/BoardService";

function Edit() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    BoardService.editView(Number(id)).then((res) => {
      setTitle(res.title);
      setContents(res.contents);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("contents", contents);

    Object.values(files).map((file) => formData.append("images", file));

    await BoardService.editItem(Number(id), formData);
    navigate(`/viewOne/${id}`);
  };

  return (
    <Container>
      <h3>문의하기</h3>
      <Form>
        <Form.Group>
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" maxLength={256} value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>첨부파일</Form.Label>
          <Form.Control type="file" multiple onChange={(e) => setFiles(e.target.files)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>상세내용</Form.Label>
          <Form.Control as="textarea" rows={5} style={{resize: "none"}} value={contents} onChange={(e) => setContents(e.target.value)} />
        </Form.Group>
      </Form>
      <button className="btn btn-secondary mt-3" style={{width: 100 + "%"}} onClick={submit}>
        수정완료
      </button>
    </Container>
  );
}

export default Edit;
