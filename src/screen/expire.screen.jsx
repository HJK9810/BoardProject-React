import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import Axios from "../Axios";
import Header from "../layout/Header";
import BoardService from "../service/BoardService";

function ExpireLogin() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies("[token]");
  const [btnWork, setBtnWork] = useState(true);

  useEffect(() => {
    if (cookie.token === "undefined") setBtnWork(false);
  }, [btnWork]);

  const reissue = async (e) => {
    e.preventDefault();
    const token = cookie.token;

    const body = {
      accessToken: token,
      refreshToken: cookie.refreshToken,
    };

    // 토큰 갱신 서버통신
    await BoardService.refreshToken(body, token).then((res) => {
      setCookie("refreshToken", res.data.refreshToken);
      setCookie("exp", res.data.accessTokenExpiresIn);
      setCookie("token", res.data.accessToken);
      Axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;

      if (!res.data) setBtnWork(false);
      else navigate("/board", {replace: true});
    });
  };

  return (
    <Container className="text-center">
      <Header headline={"Login Please"} />
      <h3 className="p-2 pt-5 mt-5">로그인 시간이 만료되었습니다.</h3>
      <h5 className="p-1">다시 로그인 하거나 시간을 연장해 주세요.</h5>
      <button className="btn btn-outline-success m-3" onClick={(e) => navigate("/login", {replace: true})}>
        로그인 하기
      </button>
      <button className="btn btn-outline-success m-3" onClick={reissue} disabled={btnWork ? "" : "disabled"}>
        연장하기
      </button>
    </Container>
  );
}

export default ExpireLogin;
