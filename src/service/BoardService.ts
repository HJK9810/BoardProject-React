import Axios from "../Axios";
import {answerForm} from "./Form";

const setHeader = (header: string) => {
  return {
    headers: {
      "Content-Type": header,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

// for header
const jsonHeader = "application/json;";
const formHeader = "multipart/form-data;";

class BoardService {
  fullFileURL(fileName: string) {
    return "http://localhost:8080/image/" + fileName;
  }

  findAll(page = 0, size: number) {
    return Axios.get(`/question/list?page=${page}&size=${size}&sort=id,desc`, setHeader(jsonHeader)).then((res) => res.data);
  }

  findByUser(email: string, page = 0, size: number) {
    return Axios.get(`/question/list/${email}?page=${page}&&size=${size}&sort=id,desc`, setHeader(jsonHeader)).then((res) => res.data);
  }

  findOne(id = 1) {
    return Axios.get(`/question/viewOne/${id}`, setHeader(jsonHeader)).then((res) => res.data);
  }

  async addItem(form: FormData) {
    return await Axios.post("/question/add", form, setHeader(formHeader));
  }

  async editItem(id = 1, form: FormData) {
    return await Axios.post(`/question/edit/${id}`, form, setHeader(formHeader));
  }

  async delItem(id = 1) {
    return await Axios.delete(`/question/del/${id}`, setHeader(jsonHeader));
  }

  async addAnswer(id = 1, form: answerForm) {
    return await Axios.post(`/answer/add/${id}`, form, setHeader(jsonHeader));
  }

  viewAnswerOne(id = 1) {
    return Axios.get(`/answer/edit/${id}`, setHeader(jsonHeader)).then((res) => res.data);
  }

  async editAnswer(id = 1, form: answerForm) {
    return await Axios.post(`/answer/edit/${id}`, form, setHeader(jsonHeader));
  }

  async delAnswer(id = 1, aid = 1) {
    return await Axios.delete(`/answer/del/${id}?aId=${aid}`, setHeader(jsonHeader));
  }
}

export default new BoardService();
