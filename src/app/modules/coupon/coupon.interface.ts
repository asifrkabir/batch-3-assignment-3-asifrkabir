import { Types } from "mongoose";

export type TCoupon = {
  code: string;
  discountPercentage: number;
  startTime: Date;
  endTime: Date;
};

export type TUserCoupon = {
  user: Types.ObjectId;
  coupon: Types.ObjectId;
  isUsed: boolean;
};
