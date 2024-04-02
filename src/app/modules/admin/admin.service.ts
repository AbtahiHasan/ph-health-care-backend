import { Prisma, PrismaClient } from "@prisma/client";

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

const AdminServices = { getAdmins, getAdminById };
export default AdminServices;
