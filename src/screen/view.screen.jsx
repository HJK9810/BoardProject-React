import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import BoardService from "../service/BoardService";
import {useNavigate, useParams} from "react-router-dom";
import Answer from "./answer.screen";
import {useCookies} from "react-cookie";
import jwtDecode from "jwt-decode";
import ImageView from "./image.view";
import Header from "../layout/Header";

function ViewOne() {
  const [post, setPost] = useState({});
  const [image, setImage] = useState([]);
  const [show, setShow] = useState("none");
  const {id} = useParams();
  const navigate = useNavigate();
  const [cookie] = useCookies(["token"]);

  const [user, setUser] = useState({});
  const [name, setName] = useState("");

  useEffect(() => {
    const token = cookie.token;

    if (cookie.exp - Date.now() < 0 && cookie.refreshToken) navigate("/expire");
    BoardService.findOne(Number(id), token).then((res) => {
      setPost(res);
      if (res.images) setImage(res.images.split(","));
      if (res.answers) setShow("block");

      setName(res.users.name);
    });
    setUser(jwtDecode(token));
  }, []);

  const dateFormat = (inputDate) => {
    const date = new Date(inputDate);
    return `${date.getFullYear()}.${(date.getMonth() + 1 + "").padStart(2, "0")}.${(date.getDate() + "").padStart(2, "0")}`;
  };

  const headline = (date) => "문의내역 조회 - " + dateFormat(date);

  return (
    <Container className="pt-5">
      <Header headline={headline(post.createdDate)} />
      <h3 className="p-3 pt-5 mb-1">{headline(post.createdDate)}</h3>
      <h5 className="p-3 mb-1">제목</h5>
      <div className="p-3 m-2 bg-dark rounded">{post.title}</div>
      <h5 className="p-3 mb-1">첨부파일</h5>
      <ImageView image={image} setImage={(p) => setImage(p)} check={false} />
      <h5 className="p-3 mb-1">상세내용</h5>
      <div className="p-3 m-2 bg-dark rounded">{post.contents}</div>
      <div style={{display: show}}>
        <Answer answers={post.answers} />
      </div>
      <button className={"btn btn-warning my-4"} style={{width: 100 + "%", display: user.sub === name ? "block" : "none"}} onClick={(e) => navigate(`/edit/${id}`)}>
        수정하기
      </button>
      <button className="btn btn-warning my-4" style={{width: 100 + "%", display: user.sub === "admin" ? "block" : "none"}} onClick={(e) => navigate(`/addAnswer/${id}`)}>
        답변하기
      </button>
    </Container>
  );
}

export default ViewOne;
