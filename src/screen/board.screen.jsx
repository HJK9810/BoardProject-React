import {useEffect, useState} from "react";
import {ButtonGroup, Container, ToggleButton} from "react-bootstrap";
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
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(["token"]);
  const [user, setUser] = useState("");
  const headline = "문의사항";

  useEffect(() => {
    const token = cookie.token;

    // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
    if (cookie.refreshToken) reissueToken(cookie);

    const email = jwtDecode(token).sub;
    setUser(email);

    if (check) {
      BoardService.findByUser(email, page, 6, token).then(dataIn);
    } else {
      BoardService.findAll(page, 6, token).then(dataIn);
    }
  }, [page, check]);

  const reissueToken = async (cookie) => {
    const token = cookie.token;
    const body = {
      accessToken: token,
      refreshToken: cookie.refreshToken,
    };

    // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
    const remainingTime = cookie.exp - Date.now();
    // 1. 완전 만료시 만료 페이지 이동
    if (remainingTime < 0) navigate("/expire");
    // 2. 완전 만료까지 시간이 남았을경우 자동 연장
    else if (remainingTime < 60000) {
      // 토큰 갱신 서버통신
      await BoardService.refreshToken(body, token).then((res) => {
        setCookie("refreshToken", res.data.refreshToken);
        setCookie("exp", res.data.accessTokenExpiresIn);
        setCookie("token", res.data.accessToken);
      });
    }
  };

  const dataIn = (data) => {
    setPost(data.content);
    setPagination({number: data.number, totalPages: data.totalPages, first: data.first, last: data.last});
  };

  const moveView = (event) => {
    event.preventDefault();
    if (event.target.id) navigate(`/viewOne/${event.target.id}`);
  };

  return (
    <Container className="pt-5">
      <Header headline={headline} />
      <h3 className="text-center m-4 pt-5">{headline}</h3>
      <div className="form-check float-end">
        <input className="form-check-input" type="checkbox" value="" id="checkBox" onChange={(e) => setCheck(e.target.checked)} checked={check ? true : false} />
        <label className="form-check-label" htmlFor="checkBox">
          나만보기
        </label>
      </div>
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

      <div className="d-flex justify-content-center mt-5">
        <Pagination pagination={pagination} setPage={(p) => setPage(p)} />
      </div>
      <button className={user === "admin" ? "btn btn-secondary my-4 disabled" : "btn btn-light mb-4"} style={{width: 100 + "%"}} onClick={(e) => navigate("/add")}>
        문의하기
      </button>
    </Container>
  );
}

export default Baord;
