import bcrypt from "bcrypt";
import { User } from "../user/user.model";

export const getExistingUserByEmail = async (email: string) => {
  const result = await User.findOne({ email }).select([
    "+password",
    "-__v",
    "-createdAt",
    "-updatedAt",
  ]);

  return result;
};

export const isPasswordValid = async (
  userInputPassword: string,
  userPasswordFromDB: string
) => {
  return await bcrypt.compare(userInputPassword, userPasswordFromDB);
};
