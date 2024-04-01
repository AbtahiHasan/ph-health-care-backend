import { IPagination } from "../interface";

const calculatePagination = (options: IPagination) => {
  const page = Number(options?.page || "1"),
    limit = Number(options?.limit || "10"),
    skip = (page - 1) * limit,
    sortBy = options?.sortBy || "createdAt",
    sortOrder = options?.sortOrder || "desc";

  return { page, limit, skip, sortBy, sortOrder };
};

export default calculatePagination;
