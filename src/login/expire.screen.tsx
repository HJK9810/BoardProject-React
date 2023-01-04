import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useLocation, useNavigate} from "react-router-dom";
import Header from "../layout/Header";
import BoardService from "../service/BoardService";
import SetCookies from "../service/SetCookies";

function ExpireLogin() {
  const navigate = useNavigate();
  const [cookie] = useCookies(["token", "refreshToken", "exp"]);
  const [btnWork, setBtnWork] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (btnWork && location.state) location.state.code === "EXPIRED_JWT_TOKEN" ? setBtnWork(false) : setBtnWork(true);
    if (cookie.token === "undefined") setBtnWork(true);
  }, [btnWork]);

  const reissue = async (e: any) => {
    e.preventDefault();

    // 토큰 갱신 서버통신
    await BoardService.refreshToken({accessToken: cookie.token, refreshToken: cookie.refreshToken}).then((res) => {
      if (res.hasOwnProperty("code")) return setBtnWork(true);

      SetCookies.refreshCookie(res);
      navigate("/board", {replace: true});
    });
  };

  return (
    <div className="text-center container">
      <Header headline={"Login Please"} />
      <h2 className="p-2 pt-5 mt-5">{location.state && location.state.code !== "EXPIRED_JWT_TOKEN" ? location.state.message : "로그인 시간이 만료되었습니다."}</h2>
      <h3 className="p-1">다시 로그인 하거나 시간을 연장해 주세요.</h3>
      <button className="btn btn-outline-success m-3" onClick={(e) => navigate("/login", {replace: true})}>
        로그인 하기
      </button>
      <button className="btn btn-outline-success m-3" onClick={reissue} disabled={btnWork}>
        연장하기
      </button>
    </div>
  );
}

export default ExpireLogin;
