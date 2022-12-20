import Axios from "../Axios";

const setHeader = (header, auth) => {
  return {
    headers: {
      "Content-Type": header,
      Authorization: `Bearer ${auth}`,
    },
  };
};

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
  findAll(page = 0, size, token) {
    return Axios.get(`/question/list?page=${page}&size=${size}&sort=id,desc`, setHeader(jsonHeader, token)).then((res) => res.data);
  }

  findOne(id = 1, token) {
    return Axios.get(`/question/viewOne/${id}`, setHeader(jsonHeader, token)).then((res) => res.data);
  }

  async addItem(form, token) {
    return await Axios.post("/question/add", form, setHeader(formHeader, token));
  }

  editView(id = 1, token) {
    return Axios.get(`/question/edit/${id}`, setHeader(jsonHeader, token)).then((res) => res.data);
  }

  async editItem(id = 1, form, token) {
    return await Axios.post(`/question/edit/${id}`, form, setHeader(formHeader, token));
  }

  async addAnswer(id = 1, form = {}, token) {
    return await Axios.post(`/answer/add/${id}`, form, setHeader(jsonHeader, token));
  }

  getUser(token) {
    return Axios.get("/question/user", setHeader(jsonHeader, token));
  }
}

export default new BoardService();
