import {MouseEvent} from "react";
import {answerForm} from "./Form";

export interface navProps {
  headline: string;
}

export interface answerProps {
  answers: answerForm[];
  viewId: string;
  token: string;
  setACount: (value: number) => void;
}

export interface imageProps {
  images: string[];
  check: boolean;
  setImage: (vlaue: string[]) => void;
}

export interface pagination {
  number: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface pageProps {
  pagination: pagination;
  setPage: (value: number) => void;
}

export interface modalProps {
  show: boolean;
  message: string;
  btnColor?: string;
  clickFunc: (value: MouseEvent) => void | Promise<void>;
  cancleFunc?: (value: undefined | MouseEvent) => void;
  id?: string;
}
