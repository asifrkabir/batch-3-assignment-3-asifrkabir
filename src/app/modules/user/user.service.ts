import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  (result as Partial<TUser>).password = undefined;

  return result;
};

export const UserService = {
  createUser,
};
