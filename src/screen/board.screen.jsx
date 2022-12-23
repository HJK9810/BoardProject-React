import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import BoardService from "../service/BoardService";
import Moment from "react-moment";
import Pagination from "./pagination.screen";
import {useCookies} from "react-cookie";
import jwtDecode from "jwt-decode";
import Header from "../layout/Header";

function Baord() {
  const [post, setPost] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(["token"]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = cookie.token;

    // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
    const last = new Date(cookie.exp);
    if (last - Date.now() < 10000 && cookie.refreshToken) {
      const body = {
        accessToken: token,
        refreshToken: cookie.refreshToken,
      };

      // 토큰 갱신 서버통신
      BoardService.refreshToken(body, token).then((res) => {
        setCookie("refreshToken", res.data.refreshToken);
        setCookie("exp", res.data.accessTokenExpiresIn);
        setCookie("token", res.data.accessToken);
      });
    }

    BoardService.findAll(page, 6, token).then((res) => {
      setPost(res.content);
      setPagination({number: res.number, totalPages: res.totalPages, first: res.first, last: res.last});
    });
    setUser(jwtDecode(token).sub);
  }, [page]);

  const moveView = (event) => {
    event.preventDefault();
    if (event.target.id) navigate(`/viewOne/${event.target.id}`);
  };

  return (
    <Container className="pt-5">
      <h3 className="text-center m-4 pt-5">문의사항</h3>
      {post.map((el) => {
        const name = el.users.name;
        const email = el.users.email;

        return (
          <div className="pt-3" key={el.id} id={el.id} onClick={email === user || user === "admin" ? moveView : () => {}}>
            <h4 className="p-2 pt-3">{el.title}</h4>
            <span className="p-2">작성자 : {email === user || user === "admin" ? name : name.charAt(0) + "*" + name.substring(2)}</span>
            <p className="p-2 mb-2 text-muted">
              <Moment date={el.createdDate} format="YYYY.MM.DD" />
            </p>
            <hr className="m-0 opacity-100" />
          </div>
        );
      })}

      <div className="d-flex justify-content-center mt-5 mb-2">
        <Pagination pagination={pagination} setPage={(p) => setPage(p)} />
      </div>
      <button className={user === "admin" ? "btn btn-secondary mb-4 disabled" : "btn btn-light mb-4"} style={{width: 100 + "%"}} onClick={(e) => navigate("/add")}>
        문의하기
      </button>
    </Container>
  );
}

export default Baord;
