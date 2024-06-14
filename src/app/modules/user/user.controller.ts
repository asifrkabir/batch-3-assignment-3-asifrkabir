import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import httpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const getUserProfile = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await UserService.getUserProfile(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getUserProfile,
};
