import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: result.accessToken,
    data: result.existingUser,
  });
});

export const AuthController = {
  loginUser,
};
