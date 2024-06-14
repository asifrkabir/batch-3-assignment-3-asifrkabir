import config from "../../config";
import bcrypt from "bcrypt";

export const encryptPassword = async (plainTextPassword: string) => {
  const encryptedPassword = await bcrypt.hash(
    plainTextPassword,
    Number(config.bcrypt_salt_rounds)
  );

  return encryptedPassword;
};
