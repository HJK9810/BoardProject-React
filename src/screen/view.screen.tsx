import {useEffect, useState} from "react";
import BoardService from "../service/BoardService";
import {useNavigate, useParams} from "react-router-dom";
import Answer from "../answer/answer.screen";
import {useCookies} from "react-cookie";
import jwtDecode from "jwt-decode";
import ImageView from "./image.view";
import Header from "../layout/Header";
import {Headlines} from "../service/Headlines";
import {decodeForm, errorForm, questionForm} from "../service/Form";
import {basicPayload, basicPost} from "../service/BasicValue";

function ViewOne() {
  const [post, setPost] = useState<questionForm>(basicPost);
  const [image, setImage] = useState([""]);
  const {id} = useParams();
  const navigate = useNavigate();
  const [cookie] = useCookies(["token", "refreshToken", "exp"]);

  const [user, setUser] = useState<decodeForm>(basicPayload);
  const [email, setEmail] = useState("");
  const [aCount, setACount] = useState(0);

  useEffect(() => {
    const token = cookie.token;
    if (!cookie.exp || token === "error") {
      navigate("/login", {replace: true});
      window.location.reload();
    }

    if (cookie.exp - Date.now() < 0 && cookie.refreshToken) navigate("/expire");
    BoardService.findOne(Number(id), token)
      .then((res) => {
        setPost(res);
        if (res.images) setImage(res.images.split(","));

        setEmail(res.users.email);
        setACount(res.answers.length);
      })
      .catch((res) => {
        const data: errorForm = res.response.data;
        data.code === "MEMBER_NOT_ALLOWED" ? navigate(-1) : navigate("/expire", {state: data});
      });
    setUser(jwtDecode(token));
  }, [aCount, cookie.exp, cookie.refreshToken, cookie.token, id, navigate]);

  return (
    <div className="pt-5 container">
      <Header headline={Headlines.view(post.createdDate)} />
      <h2 className="p-3 pt-5 mb-1">{Headlines.view(post.createdDate)}</h2>

      <h3 className="p-3 mb-1">제목</h3>
      <div className="p-3 m-2 bg-dark rounded">{post.title}</div>

      <h3 className="p-3 mb-1">첨부파일</h3>
      <ImageView image={image} setImage={(p: string[]) => setImage(p)} check={false} />

      <h3 className="p-3 mb-1">상세내용</h3>
      <div className="p-3 m-2 bg-dark rounded">{post.contents}</div>

      <div className={post.answers.length ? "" : "d-none"}>
        <Answer answers={post.answers} viewId={`${id}`} token={cookie.token} setACount={(c: number) => setACount(c)} />
      </div>

      <button className={"btn btn-ask my-4 widthMax" + (user.sub === email ? "" : " d-none")} onClick={() => navigate(`/edit/${id}`)}>
        수정하기
      </button>
      <button className={"btn btn-ask my-4 widthMax" + (user.auth.includes("ADMIN") ? "" : " d-none")} onClick={() => navigate(`/addAnswer/${id}`)}>
        답변하기
      </button>
    </div>
  );
}

export default ViewOne;
