import {useEffect, useState} from "react";
import {Container, Form} from "react-bootstrap";
import {useCookies} from "react-cookie";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Header from "../layout/Header";
import BoardService from "../service/BoardService";

function EditAnswer() {
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();
  const location = useLocation();

  const [cookie] = useCookies(["token"]);
  const headline = "답변수정하기";

  useEffect(() => {
    if (cookie.exp - Date.now() < 0 && cookie.refreshToken) navigate("/expire");
    BoardService.viewAnswerOne(id, cookie.token).then((res) => setContents(res.contents));
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await BoardService.editAnswer(Number(id), {contents: contents}, cookie.token);
    navigate(`/viewOne/${location.state}`, {replace: true});
  };

  return (
    <Container className="pt-5">
      <Header headline={headline} />
      <h3 className="pt-5">{headline}</h3>
      <Form>
        <Form.Group>
          <Form.Control as="textarea" rows={5} style={{resize: "none"}} value={contents} onChange={(e) => setContents(e.target.value)} />
        </Form.Group>
      </Form>
      <button className="btn btn-warning my-3" style={{width: 100 + "%"}} onClick={submit}>
        수정하기
      </button>
    </Container>
  );
}

export default EditAnswer;
