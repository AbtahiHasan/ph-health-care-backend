import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AdminServices from "./admin.service";
import { adminFilterableFields } from "./admin.constants";
import pick from "../../utils/pick";
import calculatePagination from "../../utils/calculatePagination";

const getAdmins = catchAsync(async (req, res) => {
  const filter = pick(req.query, adminFilterableFields);
  const optionsFilter = pick(req.query, ["sortBy", "limit", "page"]);
  const options = calculatePagination(optionsFilter);
  const result = await AdminServices.getAdmins(filter, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "admin get successfully",
    data: result?.data,
    meta: {
      page: result.meta?.page,
      limit: result.meta?.limit,
      total: result.meta?.total,
    },
  });
});

const AdminControllers = { getAdmins };
export default AdminControllers;
