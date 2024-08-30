import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { couponSearchableFields } from "./coupon.constant";
import { TCoupon } from "./coupon.interface";
import { Coupon } from "./coupon.model";

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

export const CouponService = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};
