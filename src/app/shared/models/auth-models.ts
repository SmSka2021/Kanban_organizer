export interface LoginData {
  login: string | null | undefined;
  password: string | null | undefined;
}

export interface LoginResponse {
  token: string;
}

export interface SingUpData {
  name: string | null | undefined;
  login: string | null | undefined;
  password: string | null | undefined;
}

export interface Token {
  token: string;
}
