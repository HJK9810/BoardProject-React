import Axios from "../Axios";

const header = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

class LoginService {
  loginGet() {
    return Axios.get("/login", header);
  }

  loginPost(form) {
    return Axios.post("/login", form, header);
  }
}

export default new LoginService();
