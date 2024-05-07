import bcrypt from "bcrypt";
import db from "../../lib/prisma";
import { UserRole } from "@prisma/client";
import config from "../../config";
import { IFile } from "../../interface/file";
import { fileUploader } from "../../helper/fileUploader";
import { Request } from "express";

const createAdmin = async (req: Request) => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const payload = req.body;

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
