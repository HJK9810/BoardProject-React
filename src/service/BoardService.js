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
  findAll(page = 0, size) {
    return Axios.get(`/question/list?page=${page}&size=${size}&sort=id,desc`, jsonHeader).then((res) => res.data);
  }

  findOne(id = 1) {
    return Axios.get(`/question/viewOne/${id}`, jsonHeader).then((res) => res.data);
  }

  async addItem(form) {
    return await Axios.post("/question/add", form, formHeader);
  }

  async addAnswer(id = 1, form = {}) {
    return await Axios.post(`/answer/add/${id}`, form, jsonHeader);
  }
}

export default new BoardService();
