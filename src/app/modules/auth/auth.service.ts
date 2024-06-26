import httpStatus from "http-status";
import bcrypt from "bcrypt";
import AppError from "../../error/AppError";
import prisma from "../../lib/prisma";
import { ILogin } from "./auth.interface";
import jwtHelpers from "../../helper/jwt.helper";
import config from "../../config";

const loginInUser = async (payload: ILogin) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  if (user.status === "DELETED") {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
  }
  if (user.status === "BLOCKED") {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is Blocked");
  }

  const accessToken = jwtHelpers.createToken({
    payload: { email: user?.email, role: user?.role },
    secret: config.jwt_access_secret!,
    expiresIn: config.jwt_access_expires_in!,
  });
  const refreshToken = jwtHelpers.createToken({
    payload: { email: user?.email, role: user?.role },
    secret: config.jwt_refresh_secret!,
    expiresIn: config.jwt_refresh_expires_in!,
  });

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  const payload = jwtHelpers.verifyToken({
    token,
    secret: config.jwt_refresh_secret!,
  });

  const user = await prisma.user.findUnique({
    where: {
      email: payload?.email,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "You are unauthorized");
  }

  if (user.status === "DELETED") {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are unauthorized");
  }
  if (user.status === "BLOCKED") {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are unauthorized");
  }

  const accessToken = jwtHelpers.createToken({
    payload: { email: payload?.email, role: payload?.role },
    secret: config.jwt_access_secret!,
    expiresIn: config.jwt_access_expires_in!,
  });
  return {
    accessToken,
  };
};

const AuthServices = { loginInUser, refreshToken };

export default AuthServices;
