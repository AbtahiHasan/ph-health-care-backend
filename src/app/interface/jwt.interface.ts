export interface ICreateToken {
  payload: any;
  secret: string;
  expiresIn: string;
}

export interface IVerifyToken {
  token: string;
  secret: string;
}
