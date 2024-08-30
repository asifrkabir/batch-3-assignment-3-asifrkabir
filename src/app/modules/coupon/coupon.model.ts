import { Schema, model } from "mongoose";
import { TCoupon, TUserCoupon } from "./coupon.interface";

const couponSchema = new Schema<TCoupon>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Date,
      // required: true,
    },
    endTime: {
      type: Date,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Coupon = model<TCoupon>("Coupon", couponSchema);

const userCouponSchema = new Schema<TUserCoupon>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coupon: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
    required: true,
  },
  isUsed: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export const UserCoupon = model<TUserCoupon>("UserCoupon", userCouponSchema);
