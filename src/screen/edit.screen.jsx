import {useEffect, useState} from "react";
import {Container, Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import BoardService from "../service/BoardService";
import {useCookies} from "react-cookie";
import ImageView from "./image.view";
import Header from "../layout/Header";

function Edit() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

  const [cookie] = useCookies(["token"]);
  const [image, setImage] = useState([]);
  const headline = "문의사항 수정";

  useEffect(() => {
    if (cookie.exp - Date.now() < 0 && cookie.refreshToken) navigate("/expire");

    BoardService.findOne(Number(id), cookie.token).then((res) => {
      setTitle(res.title);
      setContents(res.contents);
      setImage(res.images ? res.images.split(",") : []);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("contents", contents);
    formData.append("savedImages", image.join());

    Object.values(files).map((file) => formData.append("images", file));

    await BoardService.editItem(Number(id), formData, cookie.token);
    navigate(`/viewOne/${id}`, {replace: true});
  };

  return (
    <Container className="pt-5">
      <Header headline={headline} />
      <h3 className="p-3 pt-5 mb-1">{headline}</h3>
      <Form>
        <Form.Group className="p-3 mt-1">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" maxLength={256} value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="p-3 mt-1">
          <Form.Label>첨부파일</Form.Label>
          <Form.Control type="file" multiple onChange={(e) => setFiles(e.target.files)} />
        </Form.Group>
        <h6 className="p-3 mb-1">기존 첨부파일</h6>
        <ImageView image={image} setImage={(p) => setImage(p)} check={true} />
        <Form.Group className="p-3 mt-1">
          <Form.Label>상세내용</Form.Label>
          <Form.Control as="textarea" rows={5} style={{resize: "none"}} value={contents} onChange={(e) => setContents(e.target.value)} />
        </Form.Group>
      </Form>
      <button className="btn btn-warning my-3" style={{width: 100 + "%"}} onClick={submit}>
        수정완료
      </button>
    </Container>
  );
}

export default Edit;
