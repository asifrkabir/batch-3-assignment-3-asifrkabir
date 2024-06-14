import { TUser } from "./user.interface";
import { User } from "./user.model";
import { encryptPassword } from "./user.utils";

const createUser = async (payload: TUser) => {
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
