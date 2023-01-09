import {answerForm} from "./Form";

export interface navProps {
  headline: string;
}

export interface answerProps {
  answers: answerForm[];
  viewId: string;
  token: string;
  setACount: any;
}

export interface imageProps {
  image: string[];
  check: boolean;
  setImage: any;
}

interface pagination {
  number: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface pageProps {
  pagination: pagination;
  setPage: any;
}

export interface modalProps {
  show: boolean;
  message: string;
  btnColor?: string;
  clickFunc: any;
  cancleFunc?: any;
  id?: string;
}
