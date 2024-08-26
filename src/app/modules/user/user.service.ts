import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { encryptPassword, getExistingUserById } from "./user.utils";

const createUser = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new AppError(
      httpStatus.CONFLICT,
      "User already exists with this email. Please use a different email address"
    );
  }

  payload.password = await encryptPassword(payload.password);

  const result = await User.create(payload);

  (result as Partial<TUser>).password = undefined;

  return result;
};

const getUserProfile = async (id: string) => {
  const result = await User.findById(id);

  return result;
};

const updateUserProfile = async (id: string, payload: Partial<TUser>) => {
  const existingUser = await getExistingUserById(id);

  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).select(["-__v", "-updatedAt", "-createdAt"]);

  return result;
};

export const UserService = {
  createUser,
  getUserProfile,
  updateUserProfile,
};
