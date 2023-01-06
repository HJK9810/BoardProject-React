export interface answerForm {
  contents: string;
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

export interface webCookie {
  token: string;
  refreshToken: string;
  exp: number;
}

export interface errorForm {
  code: string;
  message: string;
}

export interface refreshCookieForm {
  state: errorForm | null;
}
