import jwt, { JwtPayload } from "jsonwebtoken";
import { ICreateToken, IVerifyToken } from "../interface/jwt.interface";
const createToken = ({ payload, secret, expiresIn }: ICreateToken) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn,
    algorithm: "HS256",
  });
};

const verifyToken = ({ token, secret }: IVerifyToken) => {
  return jwt.verify(token, secret) as JwtPayload;
};

const jwtHelpers = { createToken, verifyToken };

export default jwtHelpers;
