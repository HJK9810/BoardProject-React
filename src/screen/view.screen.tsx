import {useEffect, useState} from "react";
import BoardService from "../service/BoardService";
import {useNavigate, useParams} from "react-router-dom";
import Answer from "../answer/answer.screen";
import {useCookies} from "react-cookie";
import jwtDecode from "jwt-decode";
import ImageView from "./image.view";
import Header from "../layout/Header";

function ViewOne() {
  const [post, setPost] = useState({title: "", contents: "", createdDate: "", answers: []});
  const [image, setImage] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();
  const [cookie] = useCookies(["token", "refreshToken", "exp"]);

  const [user, setUser] = useState({sub: "", auth: "", exp: ""});
  const [email, setEmail] = useState("");
  const [aCount, setACount] = useState(0);

  useEffect(() => {
    const token = cookie.token;

    if (cookie.exp - Date.now() < 0 && cookie.refreshToken) navigate("/expire");
    BoardService.findOne(Number(id), token).then((res) => {
      if (res.hasOwnProperty("data")) navigate("/expire", {state: res.data});
      setPost(res);
      if (res.images) setImage(res.images.split(","));

      setEmail(res.users.email);
      setACount(res.answers.length);
    });
    setUser(jwtDecode(token));
  }, [aCount]);

  const dateFormat = (inputDate: any) => {
    const date = new Date(inputDate);
    return `${date.getFullYear()}.${(date.getMonth() + 1 + "").padStart(2, "0")}.${(date.getDate() + "").padStart(2, "0")}`;
  };

  const headline = (date: any) => "문의내역 조회 - " + dateFormat(date);

  return (
    <div className="pt-5 container">
      <Header headline={headline(post.createdDate)} />
      <h3 className="p-3 pt-5 mb-1">{headline(post.createdDate)}</h3>

      <h5 className="p-3 mb-1">제목</h5>
      <div className="p-3 m-2 bg-dark rounded">{post.title}</div>

      <h5 className="p-3 mb-1">첨부파일</h5>
      <ImageView image={image} setImage={(p: any) => setImage(p)} check={false} />

      <h5 className="p-3 mb-1">상세내용</h5>
      <div className="p-3 m-2 bg-dark rounded">{post.contents}</div>

      <div className={post.answers ? "" : "hideItem"}>
        <Answer answers={post.answers} viewId={`${id}`} token={cookie.token} setACount={(c: any) => setACount(c)} />
      </div>

      <button className={"btn btn-warning my-4 widthMax" + (user.sub === email ? "" : " hideItem")} onClick={(e) => navigate(`/edit/${id}`)}>
        수정하기
      </button>
      <button className={"btn btn-warning my-4 widthMax" + (user.auth.includes("ADMIN") ? "" : " hideItem")} onClick={(e) => navigate(`/addAnswer/${id}`)}>
        답변하기
      </button>
    </div>
  );
}

export default ViewOne;