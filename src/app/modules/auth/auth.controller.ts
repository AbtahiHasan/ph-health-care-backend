import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AuthServices from "./auth.service";

const loginInUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginInUser(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user login successfully",
    data: {
      needPasswordChange: result.needPasswordChange,
      accessToken: result.accessToken,
    },
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const result = await AuthServices.refreshToken(req.cookies.refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "token refreshed successfully",
    data: {
      accessToken: result.accessToken,
    },
  });
});
const AuthControllers = { loginInUser, refreshToken };

export default AuthControllers;
