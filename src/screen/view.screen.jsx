import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import BoardService from "../service/BoardService";
import Moment from "react-moment";
import {useNavigate, useParams} from "react-router-dom";
import Answer from "./answer.screen";
import {useCookies} from "react-cookie";
import jwtDecode from "jwt-decode";

function ViewOne() {
  const [post, setPost] = useState({});
  const [image, setImage] = useState([]);
  const [show, setShow] = useState("none");
  const {id} = useParams();
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token"]);

  const fileDir = "http://localhost:8080/image/";

  const [user, setUser] = useState({});
  const [name, setName] = useState("");

  useEffect(() => {
    const token = cookie.token;

    BoardService.findOne(Number(id), token).then((res) => {
      setPost(res);
      if (res.images) setImage(res.images.split(","));
      if (res.answers) setShow("block");

      setName(res.users.name);
    });
    setUser(jwtDecode(token));
  }, []);

  const showImage = (root) => {
    return <img key={root} src={fileDir + root} width={300 + "px"} />;
  };

  return (
    <Container>
      <h3>
        문의내역 조회 - <Moment date={post.createdDate} format="YYYY.MM.DD" />
      </h3>
      <h4>제목</h4>
      <div>{post.title}</div>
      <h4>첨부파일</h4>
      <div style={{overflow: "scroll"}}>{image ? image.map((el) => (el ? showImage(el) : null)) : null}</div>
      <h4>상세내용</h4>
      <div>{post.contents}</div>
      <div style={{display: show}}>
        <Answer answers={post.answers} />
      </div>
      <button className="btn btn-secondary mb-1" style={{width: 100 + "%", display: user.sub == name ? "block" : "none"}} onClick={(e) => navigate(`/edit/${id}`)}>
        수정하기
      </button>
      <button className="btn btn-secondary" style={{width: 100 + "%", display: user.sub == "admin" ? "block" : "none"}} onClick={(e) => navigate(`/addAnswer/${id}`)}>
        답변하기
      </button>
    </Container>
  );
}

export default ViewOne;
