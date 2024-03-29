import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AdminServices from "./admin.service";

const getAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAdmins(
    req?.query as Record<string, string>
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "admin get successfully",
    data: result,
  });
});

const AdminControllers = { getAdmins };
export default AdminControllers;
