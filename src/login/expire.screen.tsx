import {MouseEvent, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useLocation, useNavigate} from "react-router-dom";
import Header from "../layout/Header";
import {Headlines} from "../service/Headlines";
import SetTokens from "../service/SetTokens";

function ExpireLogin() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token", "refreshToken", "exp"]);
  const [btnWork, setBtnWork] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!cookie.token || cookie.token === "error") {
      navigate("/login", {replace: true});
      window.location.reload();
    }

    if (btnWork && location.state) location.state.code === "REFRESH_TOKEN_NOT_FOUND" ? setBtnWork(true) : setBtnWork(false);
    if (cookie.token === "error") setBtnWork(true);
  }, [btnWork, cookie.token, location.state, navigate]);

  const reissue = async (e: MouseEvent) => {
    e.preventDefault();

    // 토큰 갱신 서버통신
    await SetTokens.refreshToken({accessToken: cookie.token, refreshToken: cookie.refreshToken})
      .then((res) => {
        SetTokens.refreshCookie(res);
        navigate("/board", {replace: true});
      })
      .catch(() => {
        setCookie("token", "error");
        return setBtnWork(true);
      });
  };

  return (
    <div className="text-center container">
      <Header headline={Headlines.expire} />
      <h2 className="p-2 pt-5 mt-5">{location.state && location.state.code !== "EXPIRED_JWT_TOKEN" ? location.state.message : "로그인 시간이 만료되었습니다."}</h2>
      <h3 className="p-1">다시 로그인 하거나 시간을 연장해 주세요.</h3>
      <button className="btn btn-outline-success m-3" onClick={() => navigate("/login", {replace: true})}>
        로그인 하기
      </button>
      <button className="btn btn-outline-success m-3" onClick={reissue} disabled={btnWork}>
        연장하기
      </button>
    </div>
  );
}

export default ExpireLogin;
