import {MouseEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BoardService from "../service/BoardService";
import Moment from "react-moment";
import Pagination from "./pagination.screen";
import {useCookies} from "react-cookie";
import jwtDecode from "jwt-decode";
import Header from "../layout/Header";
import SetCookies from "../service/SetCookies";
import {Headlines} from "../service/Headlines";
import {decodeForm, errorForm, questionForm, userForm, webCookie} from "../service/Form";
import {BoardForm} from "../service/BoardForm";

function Baord() {
  const [post, setPost] = useState<questionForm[]>([]);
  const [pagination, setPagination] = useState({number: 0, totalPages: 0, first: false, last: false});
  const [page, setPage] = useState(0);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const [cookie] = useCookies(["token", "refreshToken", "exp"]);
  const [user, setUser] = useState({exp: 0, sub: "", auth: ""});

  useEffect(() => {
    const token = cookie.token;

    const reissueToken = async (cookie: webCookie) => {
      const remainingTime = cookie.exp - Date.now();

      // 1. 완전 만료시 만료 페이지 이동
      if (remainingTime < 0) navigate("/expire");
      else if (remainingTime < 1000 * 60 * 5) {
        // 2. 완전 만료까지 시간이 남았을경우 자동 연장
        const error: errorForm | null = await SetCookies.tokenRefresh(cookie.token, cookie.refreshToken);
        if (!error) navigate("/expire", {state: error});
      }
    };

    // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
    if (cookie.refreshToken) reissueToken({token: token, refreshToken: cookie.refreshToken, exp: cookie.exp});

    const decodeToken: decodeForm = jwtDecode(token);
    setUser(decodeToken);

    if (check) {
      BoardService.findByUser(decodeToken.sub, page, 6, token)
        .then(dataIn)
        .catch((res) => navigate("/expire", {state: res.response.data}));
    } else {
      BoardService.findAll(page, 6, token)
        .then(dataIn)
        .catch((res) => navigate("/expire", {state: res.response.data}));
    }
  }, [page, check, cookie.token, cookie.refreshToken, cookie.exp, navigate]);

  const dataIn = (data: BoardForm) => {
    console.log(data);
    setPost(data.content);
    setPagination({number: data.number, totalPages: data.totalPages, first: data.first, last: data.last});
  };

  const moveView = (e: MouseEvent) => {
    e.preventDefault();
    const findOne: questionForm | undefined = post.find((el: questionForm) => e.currentTarget.id === el.id + "");
    const choiceOne: userForm | null = findOne ? findOne.users : null;

    if (choiceOne && (choiceOne.email === user.sub || user.auth.includes("ADMIN"))) navigate(`/viewOne/${e.currentTarget.id}`);
  };

  return (
    <div className="pt-5 container">
      <Header headline={Headlines.board} />
      <h2 className="text-center m-4 pt-5">{Headlines.board}</h2>
      <div className="form-check float-end">
        <input className="form-check-input" type="checkbox" value="" id="checkBox" onChange={(e) => setCheck(e.target.checked)} checked={check ? true : false} />
        <label className="form-check-label" htmlFor="checkBox">
          나만보기
        </label>
      </div>
      {post.map((el: questionForm) => {
        const name = el.users.name;
        const email = el.users.email;

        return (
          <div className="pt-3" key={el.id} id={el.id + ""} onClick={moveView}>
            <h3 className="p-2 pt-3" id={el.id + ""} onClick={moveView}>
              {el.title}
            </h3>
            <span className="p-2" id={el.id + ""} onClick={moveView}>
              작성자 : {email === user.sub || user.auth.includes("ADMIN") ? name : name.charAt(0) + "*" + name.substring(2)}
            </span>
            <p className="p-2 mb-2 text-muted" id={el.id + ""} onClick={moveView}>
              <Moment date={el.createdDate} format="YYYY.MM.DD" />
            </p>
            <hr className="m-0 opacity-100" id={el.id + ""} onClick={moveView} />
          </div>
        );
      })}

      <div className="d-flex justify-content-center mt-5">
        <Pagination pagination={pagination} setPage={(p: number) => setPage(p)} />
      </div>
      <button className={"btn btn-ask my-4 widthMax " + (user.auth.includes("ADMIN") ? "d-none" : "")} onClick={() => navigate("/add")}>
        문의하기
      </button>
    </div>
  );
}

export default Baord;
