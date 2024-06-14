import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser } from "./auth.interface";
import { getExistingUserByEmail, isPasswordValid } from "./auth.utils";
import { TUser } from "../user/user.interface";

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  const existingUser = await getExistingUserByEmail(email);

  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  if (!(await isPasswordValid(password, existingUser?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password is incorrect!");
  }

  (existingUser as Partial<TUser>).password = undefined;

  return existingUser;
};

export const AuthService = {
  loginUser,
};
