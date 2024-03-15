import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import UserServices from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdmin(req?.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "admin create successfully",
    data: result,
  });
});

const UserController = { createAdmin };
export default UserController;
