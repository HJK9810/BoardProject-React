import {ChangeEvent, MouseEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BoardService from "../service/BoardService";
import Moment from "react-moment";
import Pagination from "./pagination.screen";
import jwtDecode from "jwt-decode";
import Header from "../layout/Header";
import SetTokens from "../service/SetTokens";
import {Headlines} from "../service/Headlines";
import {BoardForm, decodeForm, errorForm, questionForm, userForm} from "../service/Form";
import {basicPayload} from "../service/BasicValue";

function Baord() {
  const [post, setPost] = useState<questionForm[]>([]);
  const [pagination, setPagination] = useState({number: 0, totalPages: 0, first: false, last: false});
  const [page, setPage] = useState(0);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(basicPayload);

  useEffect(() => {
    const token = localStorage.token;
    if (!token || token === "error") {
      navigate("/login", {replace: true});
      window.location.reload();
    }

    const remainingTime = localStorage.exp - Date.now();
    const reissueToken = async () => {
      // 1. 완전 만료시 만료 페이지 이동
      if (remainingTime < 0) navigate("/expire");
      else if (remainingTime < 1000 * 60 * 5) {
        // 2. 완전 만료까지 시간이 남았을경우 자동 연장
        const error: errorForm | null = await SetTokens.tokenRefresh(localStorage.token, localStorage.refreshToken);
        if (error) navigate("/expire", {state: error});
      }
    };

    // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
    if (localStorage.refreshToken) reissueToken();

    const decodeToken: Readonly<decodeForm> = jwtDecode(token);
    setUser(decodeToken);

    if (check && remainingTime > 0) {
      BoardService.findByUser(decodeToken.sub, page, 6, token)
        .then(dataIn)
        .catch((res) => navigate("/expire", {state: res.response.data}));
    } else if (remainingTime > 0) {
      BoardService.findAll(page, 6, token)
        .then(dataIn)
        .catch((res) => navigate("/expire", {state: res.response.data}));
    }
  }, [page, check, navigate]);

  const dataIn = (data: Readonly<BoardForm>) => {
    setPost(data.content);
    setPagination({number: data.number, totalPages: data.totalPages, first: data.first, last: data.last});
  };

  const moveView = (e: MouseEvent) => {
    e.preventDefault();
    const findOne: Readonly<questionForm> | undefined = post.find((el: Readonly<questionForm>) => e.currentTarget.id === el.id + "");
    const choiceOne: Readonly<userForm> | null = findOne ? findOne.users : null;

    if (choiceOne && (choiceOne.email === user.sub || user.auth.includes("ADMIN"))) navigate(`/viewOne/${e.currentTarget.id}`);
  };

  const checkControll = (e: ChangeEvent) => {
    setPage(0);
    setCheck((e.target as HTMLInputElement).checked);
  };

  const printOne = (el: Readonly<questionForm>) => {
    const name: string = el.users.name;
    const id: string = el.id + "";

    return (
      <div className="pt-3" key={el.id} id={id} onClick={moveView}>
        <h3 className="p-2 pt-3" id={id} onClick={moveView}>
          {el.title}
        </h3>
        <span className="p-2" id={id} onClick={moveView}>
          작성자 : {el.users.email === user.sub || user.auth.includes("ADMIN") ? name : name.charAt(0) + "*" + name.substring(2)}
        </span>
        <p className="p-2 mb-2 text-muted" id={id} onClick={moveView}>
          <Moment date={el.createdDate} format="YYYY.MM.DD" />
        </p>
        <hr className="m-0 opacity-100" id={id} onClick={moveView} />
      </div>
    );
  };

  return (
    <div className="pt-5 container">
      <Header headline={Headlines.board} />
      <h2 className="text-center m-4 pt-5">{Headlines.board}</h2>
      <div className="form-check float-end">
        <input className="form-check-input" type="checkbox" value="" id="checkBox" onChange={checkControll} checked={check} disabled={user.auth.includes("ADMIN")} />
        <label className="form-check-label" htmlFor="checkBox">
          {user.auth.includes("ADMIN") ? "관리자계정" : "나만보기"}
        </label>
      </div>
      {post.map(printOne)}

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
