import {setCookie} from "typescript-cookie";
import Axios from "../Axios";
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
    return await this.refreshToken({accessToken: token, refreshToken: refreshToken})
      .then((res: cookieForm): null => {
        this.refreshCookie(res);
        return null;
      })
      .catch((res): errorForm => {
        return res.response.data;
      });
  };

  async refreshToken(form: cookieForm) {
    return await Axios.post("/api/reissue", form).then((res) => res.data);
  }

  async login(form: object) {
    return await Axios.post("/api/login", form).then((res) => res.data);
  }

  logout(email: string) {
    return Axios.get(`/api/logout/${email}`);
  }
}

export default new SetCookies();
