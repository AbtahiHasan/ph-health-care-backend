import { Admin, Prisma, PrismaClient, UserStatus } from "@prisma/client";

import prisma from "../../lib/prisma";

const getAdmins = async (query: Record<string, unknown>, options: any) => {
  const { searchTerms, ...filterData } = query;
  const { skip, limit, sortOrder, sortBy } = options;
  const andCondition: Prisma.AdminWhereInput[] = [];

  const searchFields = ["name", "email"];
  if (query?.searchTerms) {
    andCondition.push({
      OR: searchFields.map((field) => ({
        [field]: {
          contains: query?.searchTerms,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.AdminWhereInput = {
    AND: andCondition,
  };

  console.log({ AND: andCondition });
  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.admin.count({
    where: whereCondition,
  });

  return {
    data: result,
    meta: {
      page: options?.page || 1,
      limit: options?.limit || 10,
      total,
    },
  };
};

const getAdminById = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateAdminDataById = async (id: string, data: Partial<Admin>) => {
  const isExits = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  if (!isExits) {
    throw new Error("Admin not found");
  }

  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteAdminById = async (id: string): Promise<Admin | null> => {
  const isExits = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  if (!isExits) {
    throw new Error("Admin not found");
  }

  const deletedAdmin = prisma.admin.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  const deletedUser = prisma.user.update({
    where: {
      email: isExits.email,
    },
    data: {
      isDeleted: true,
      status: UserStatus.DELETED,
    },
  });

  const [deletedAdminData, deletedUserData] = await prisma.$transaction([
    deletedAdmin,
    deletedUser,
  ]);

  return deletedAdminData;
};

const AdminServices = {
  getAdmins,
  getAdminById,
  updateAdminDataById,
  deleteAdminById,
};
export default AdminServices;
