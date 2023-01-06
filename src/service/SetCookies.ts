import {setCookie} from "typescript-cookie";
import Axios from "../Axios";
import BoardService from "./BoardService";
import {cookieForm, errorForm} from "./Form";

class SetCookies {
  refreshCookie(data: cookieForm) {
    setCookie("refreshToken", data.refreshToken);
    setCookie("exp", data.accessTokenExpiresIn);
    setCookie("token", data.accessToken);
    Axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
  }

  tokenRefresh = async (token: string, refreshToken: string) => {
    // 토큰 갱신 서버통신
    return await BoardService.refreshToken({accessToken: token, refreshToken: refreshToken})
      .then((res: cookieForm) => {
        this.refreshCookie(res);
        return null;
      })
      .catch((res) => {
        const error: errorForm = res.response.data;
        return error;
      });
  };
}

export default new SetCookies();
