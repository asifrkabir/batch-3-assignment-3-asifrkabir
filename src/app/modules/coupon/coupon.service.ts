import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { couponSearchableFields } from "./coupon.constant";
import { TCoupon, TUserCoupon } from "./coupon.interface";
import { Coupon, UserCoupon } from "./coupon.model";

const createCoupon = async (payload: TCoupon) => {
  const result = await Coupon.create(payload);

  return result;
};

const getAllCoupons = async (query: Record<string, unknown>) => {
  const couponQuery = new QueryBuilder(Coupon.find(), query)
    .search(couponSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await couponQuery.modelQuery;
  const meta = await couponQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getCouponById = async (id: string) => {
  const result = await Coupon.findById(id);

  return result;
};

const updateCoupon = async (id: string, payload: Partial<TCoupon>) => {
  const existingCoupon = await Coupon.findById(id);

  if (!existingCoupon) {
    throw new AppError(httpStatus.NOT_FOUND, "Coupon not found");
  }

  const result = await Coupon.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteCoupon = async (id: string) => {
  const existingCoupon = await Coupon.findById(id);

  if (!existingCoupon) {
    throw new AppError(httpStatus.NOT_FOUND, "Coupon not found");
  }

  const result = await Coupon.findOneAndDelete({ _id: id });

  return result;
};

const assignCouponToUser = async (payload: TUserCoupon) => {
  const { user } = payload;

  const existingUserCoupon = await UserCoupon.find({ user, isUsed: true });

  if (!existingUserCoupon) {
    throw new AppError(
      httpStatus.CONFLICT,
      "User already has an active coupon"
    );
  }

  const result = await UserCoupon.create(payload);

  return result;
};

const getUserCouponByUserId = async (userId: string) => {
  const result = await UserCoupon.findOne({
    user: userId,
    isUsed: false,
  }).populate("coupon");

  return result;
};

const updateUserCoupon = async (userCouponId: string) => {
  const result = await UserCoupon.findOneAndUpdate(
    { _id: userCouponId },
    { isUsed: true },
    { new: true }
  );

  return result;
};

export const CouponService = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  assignCouponToUser,
  getUserCouponByUserId,
  updateUserCoupon,
};
