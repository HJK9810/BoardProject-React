import {setCookie} from "typescript-cookie";
import Axios from "../Axios";
import BoardService from "./BoardService";

class SetCookies {
  refreshCookie(data: any) {
    setCookie("refreshToken", data.refreshToken);
    setCookie("exp", data.accessTokenExpiresIn);
    setCookie("token", data.accessToken);
    Axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
  }

  tokenRefresh = async (token: string, refreshToken: string) => {
    // 토큰 갱신 서버통신
    await BoardService.refreshToken({accessToken: token, refreshToken: refreshToken}).then((res) => {
      if (res.hasOwnProperty("code")) return {state: res};

      setCookie("refreshToken", res.refreshToken);
      setCookie("exp", res.accessTokenExpiresIn);
      setCookie("token", res.accessToken);
      Axios.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;
      return null;
    });
  };
}

export default new SetCookies();
