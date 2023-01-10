export interface BoardForm {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  totalElements: number;
  totalPages: number;
  content: questionForm[];
}

export interface questionForm {
  id: number;
  title: string;
  contents: string;
  images: string;
  createdDate: string;
  modifiedDate: string;
  answers: answerForm[];
  users: userForm;
}

export interface answerForm {
  id?: number;
  contents: string;
  createdDate?: string;
  modifiedDate?: string;
}

export interface userForm {
  id: number;
  name: string;
  email: string;
  createdDate: string;
  modifiedDate: string;
}

export interface decodeForm {
  exp: number;
  sub: string;
  auth: string;
}

export interface cookieForm {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn?: number;
  grantType?: string;
}

export interface errorForm {
  code: string;
  message: string;
}
