import {useEffect, useState} from "react";
import {Container, Form} from "react-bootstrap";
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../layout/Header";
import BoardService from "../service/BoardService";

function AddAnswer() {
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  const [cookie] = useCookies(["token"]);
  const headline = "답변하기";

  useEffect(() => {
    if (cookie.exp - Date.now() < 0 && cookie.refreshToken) navigate("/expire");
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await BoardService.addAnswer(id, {contents: contents}, cookie.token);
    navigate(`/viewOne/${id}`, {replace: true});
  };

  return (
    <Container className="pt-5">
      <Header headline={headline} />
      <h3 className="pt-5">{headline}</h3>
      <Form>
        <Form.Group>
          <Form.Label>답변내용</Form.Label>
          <Form.Control as="textarea" rows={5} style={{resize: "none"}} onChange={(e) => setContents(e.target.value)} />
        </Form.Group>
      </Form>
      <button className="btn btn-warning my-3" style={{width: 100 + "%"}} onClick={submit}>
        답변 남기기
      </button>
    </Container>
  );
}

export default AddAnswer;
