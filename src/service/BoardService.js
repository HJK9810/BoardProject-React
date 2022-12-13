import Axios from "../Axios";

const jsonHeader = {
  headers: {
    "Content-Type": "application/json;",
  },
};

const formHeader = {
  headers: {
    "Content-Type": "multipart/form-data;",
  },
};

class BoardService {
  findAll() {
    return Axios.get("/question/list", jsonHeader).then((res) => res.data);
  }

  findOne(id = 1) {
    return Axios.get(`/question/viewOne/${id}`, jsonHeader).then((res) => res.data);
  }

  async addItem(form) {
    return await Axios.post("/question/add", form, formHeader);
  }
}

export default new BoardService();
