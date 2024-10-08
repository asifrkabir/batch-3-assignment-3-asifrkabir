import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE_LIST } from "./user.constant";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: USER_ROLE_LIST,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<TUser>("User", userSchema);
