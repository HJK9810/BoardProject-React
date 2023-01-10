import Axios from "../Axios";
import {cookieForm, errorForm, loginForm} from "./Form";

class SetTokens {
  refreshStorage(data: Readonly<cookieForm>) {
    const exp: string = data.accessTokenExpiresIn ? data.accessTokenExpiresIn + "" : "";

    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("exp", exp);
    localStorage.setItem("token", data.accessToken);
    Axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
  }

  tokenRefresh = async (token: string, refreshToken: string) => {
    // 토큰 갱신 서버통신
    return await this.refreshToken({accessToken: token, refreshToken: refreshToken})
      .then((res: Readonly<cookieForm>): null => {
        this.refreshStorage(res);
        return null;
      })
      .catch((res): errorForm => {
        return res.response.data;
      });
  };

  async refreshToken(form: cookieForm) {
    return await Axios.post("/api/reissue", form).then((res) => res.data);
  }

  async login(form: loginForm) {
    return await Axios.post("/api/login", form).then((res) => res.data);
  }

  logout(email: string) {
    return Axios.get(`/api/logout/${email}`);
  }
}

export default new SetTokens();
