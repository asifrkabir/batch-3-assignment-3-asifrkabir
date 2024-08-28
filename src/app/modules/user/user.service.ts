import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { encryptPassword, getExistingUserById } from "./user.utils";
import QueryBuilder from "../../builder/QueryBuilder";
import { userSearchableFields } from "./user.constant";

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

const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    result,
  };
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

const deleteUser = async (id: string) => {
  if (!(await User.findById(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const result = await User.findOneAndDelete({ _id: id }).select([
    "-__v",
    "-createdAt",
    "-updatedAt",
  ]);

  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
