import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser } from "./auth.interface";
import { createToken, isPasswordValid } from "./auth.utils";
import { TUser } from "../user/user.interface";
import config from "../../config";
import { getExistingUserByEmail } from "../user/user.utils";

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  const existingUser = await getExistingUserByEmail(email);

  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  if (!(await isPasswordValid(password, existingUser?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password is incorrect!");
  }

  const jwtPayload = {
    userId: (existingUser?._id).toString(),
    role: existingUser?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  (existingUser as Partial<TUser>).password = undefined;

  return { accessToken, existingUser };
};

export const AuthService = {
  loginUser,
};
