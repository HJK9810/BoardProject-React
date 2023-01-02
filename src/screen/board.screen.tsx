import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BoardService from "../service/BoardService";
import Moment from "react-moment";
import Pagination from "./pagination.screen";
import {useCookies} from "react-cookie";
import jwtDecode from "jwt-decode";
import Header from "../layout/Header";
import Axios from "../Axios";

function Baord() {
  const [post, setPost] = useState([]);
  const [pagination, setPagination] = useState({number: 0, totalPages: 0, first: false, last: false});
  const [page, setPage] = useState(0);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(["token", "refreshToken", "exp"]);
  const [user, setUser] = useState({sub: "", auth: "", exp: ""});
  const headline = "문의사항";
  const emails: any = {};

  useEffect(() => {
    const token = cookie.token;

    // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
    if (cookie.refreshToken) reissueToken(cookie, null);

    const decodeToken: any = jwtDecode(token);
    setUser(decodeToken);

    if (check) {
      BoardService.findByUser(decodeToken.sub, page, 6, token).then(dataIn);
    } else {
      BoardService.findAll(page, 6, token).then(dataIn);
    }
  }, [page, check]);

  const reissueToken = async (cookie: any, err: any) => {
    const body = {
      accessToken: cookie.token,
      refreshToken: cookie.refreshToken,
    };

    // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
    const remainingTime = cookie.exp - Date.now();
    // 1. 완전 만료시 만료 페이지 이동
    if (remainingTime < 0 && !err) navigate("/expire", {state: err});
    // 2. 완전 만료까지 시간이 남았을경우 자동 연장
    else if (remainingTime < 1000 * 60 * 5 || err) {
      // 토큰 갱신 서버통신
      await BoardService.refreshToken(body).then((res) => {
        if (res.hasOwnProperty("code")) navigate("/expire", {state: res});
        setCookie("refreshToken", res.refreshToken);
        setCookie("exp", res.accessTokenExpiresIn);
        setCookie("token", res.accessToken);
        Axios.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;
      });
    }
  };

  const dataIn = (data: any) => {
    if (data.hasOwnProperty("code")) navigate("/expire", {state: data});

    setPost(data.content);
    setPagination({number: data.number, totalPages: data.totalPages, first: data.first, last: data.last});
  };

  const moveView = (e: any) => {
    e.preventDefault();
    if (emails[e.target.id] === user.sub || user.auth.includes("ADMIN")) {
      if (e.target.id) navigate(`/viewOne/${e.target.id}`);
    }
  };

  return (
    <div className="pt-5 container">
      <Header headline={headline} />
      <h2 className="text-center m-4 pt-5">{headline}</h2>
      <div className="form-check float-end">
        <input className="form-check-input" type="checkbox" value="" id="checkBox" onChange={(e) => setCheck(e.target.checked)} checked={check ? true : false} />
        <label className="form-check-label" htmlFor="checkBox">
          나만보기
        </label>
      </div>
      {post.map((el: any) => {
        const name = el.users.name;
        const email = el.users.email;
        emails[el.id] = email;

        return (
          <div className="pt-3" key={el.id} id={el.id} onClick={moveView}>
            <h3 className="p-2 pt-3" id={el.id} onClick={moveView}>
              {el.title}
            </h3>
            <span className="p-2" id={el.id} onClick={moveView}>
              작성자 : {email === user.sub || user.auth.includes("ADMIN") ? name : name.charAt(0) + "*" + name.substring(2)}
            </span>
            <p className="p-2 mb-2 text-muted" id={el.id} onClick={moveView}>
              <Moment date={el.createdDate} format="YYYY.MM.DD" />
            </p>
            <hr className="m-0 opacity-100" id={el.id} onClick={moveView} />
          </div>
        );
      })}

      <div className="d-flex justify-content-center mt-5">
        <Pagination pagination={pagination} setPage={(p: any) => setPage(p)} />
      </div>
      <button className="btn btn-ask my-4 widthMax " onClick={(e) => navigate("/add")} disabled={user.auth.includes("ADMIN") ? true : false}>
        문의하기
      </button>
    </div>
  );
}

export default Baord;
