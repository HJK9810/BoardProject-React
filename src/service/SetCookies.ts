import {setCookie} from "typescript-cookie";
import Axios from "../Axios";

class SetCookies {
  refreshCookie(data: any) {
    setCookie("refreshToken", data.refreshToken);
    setCookie("exp", data.accessTokenExpiresIn);
    setCookie("token", data.accessToken);
    Axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
  }
}

export default new SetCookies();
