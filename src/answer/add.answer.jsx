import {useState} from "react";
import {Container, Form} from "react-bootstrap";
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import BoardService from "../service/BoardService";

function AddAnswer() {
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  const [cookie, setCookie] = useCookies(["token"]);

  const submit = async (e) => {
    e.preventDefault();

    await BoardService.addAnswer(id, {contents: contents}, cookie.token);
    navigate(`/viewOne/${id}`);
  };

  return (
    <Container>
      <h3>답변하기</h3>
      <Form>
        <Form.Group>
          <Form.Label>답변내용</Form.Label>
          <Form.Control as="textarea" rows={5} style={{resize: "none"}} onChange={(e) => setContents(e.target.value)} />
        </Form.Group>
      </Form>
      <button className="btn btn-secondary mt-3" style={{width: 100 + "%"}} onClick={submit}>
        답변 남기기
      </button>
    </Container>
  );
}

export default AddAnswer;
