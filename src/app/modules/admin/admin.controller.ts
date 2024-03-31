import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AdminServices from "./admin.service";
import { adminFilterableFields } from "./admin.constants";
import pick from "../../utils/pick";

const getAdmins = catchAsync(async (req, res) => {
  const filter = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  const result = await AdminServices.getAdmins(filter, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "admin get successfully",
    data: result,
  });
});

const AdminControllers = { getAdmins };
export default AdminControllers;
