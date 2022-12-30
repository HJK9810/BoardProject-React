import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export default Axios;
