export interface LoginBean {
  code: number;
  data: LoginData;
  msg: string;
}

interface LoginData {
  username: string;
  token: string;
}