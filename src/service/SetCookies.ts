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
    return await BoardService.refreshToken({accessToken: token, refreshToken: refreshToken}).then((res) => {
      if (res.hasOwnProperty("code")) return {state: res};

      this.refreshCookie(res);
      return {state: null};
    });
  };
}

export default new SetCookies();
