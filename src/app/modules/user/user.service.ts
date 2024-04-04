import bcrypt from "bcrypt";
import { PrismaClient, User, UserRole } from "@prisma/client";
import config from "../../config";

const db = new PrismaClient();

const createAdmin = async (payload: any) => {
  console.log(payload);
  const hashPassword = await bcrypt.hash(
    payload?.password,
    Number(config.bcrypt_salt_rounds)
  );

  const user = db.user.create({
    data: {
      email: payload?.admin?.email as string,
      password: hashPassword,
      role: UserRole.ADMIN,
    },
  });

  const admin = db.admin.create({
    data: payload?.admin,
  });

  const result = await db.$transaction([user, admin]);

  return result;
};

const UserServices = { createAdmin };
export default UserServices;
