import Axios from "../Axios";

const jsonHeader = {
  headers: {
    "Content-Type": "application/json",
  },
};

class BoardService {
  findAll() {
    return Axios.get("/question/list").then((res) => res.data);
  }

  findOne(id = 1) {
    return Axios.get(`/question/viewOne/${id}`).then((res) => res.data);
  }
}

export default new BoardService();
