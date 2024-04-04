import httpStatus from "http-status";
import bcrypt from "bcrypt";
import AppError from "../../error/AppError";
import prisma from "../../lib/prisma";
import { ILogin } from "./auth.interface";

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
};

const AuthServices = {};

export default AuthServices;
