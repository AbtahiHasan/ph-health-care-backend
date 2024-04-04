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
const AuthControllers = { loginInUser };

export default AuthControllers;
