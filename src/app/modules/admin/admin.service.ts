import { Prisma, PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const getAdmins = async (query: Record<string, unknown>, options: any) => {
  const { searchTerms, ...filterData } = query;
  const andCondition: Prisma.AdminWhereInput[] = [];
  const { sortBy, limit, page } = options;
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
  const result = await db.admin.findMany({
    where: whereCondition,
    skip: (Number(page || "1") - 1) * limit || 20,
    take: Number(limit || 20),
  });

  return result;
};

const AdminServices = { getAdmins };
export default AdminServices;
