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

const getAdminById = catchAsync(async (req, res) => {
  const result = await AdminServices.getAdminById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "single admin fetched successfully!",
    data: result,
  });
});
const updateAdminDataById = catchAsync(async (req, res) => {
  const result = await AdminServices.updateAdminDataById(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "admin updated successfully!",
    data: result,
  });
});
const deleteAdminById = catchAsync(async (req, res) => {
  const result = await AdminServices.deleteAdminById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "admin deleted successfully!",
    data: result,
  });
});

const AdminControllers = {
  getAdmins,
  getAdminById,
  updateAdminDataById,
  deleteAdminById,
};
export default AdminControllers;
