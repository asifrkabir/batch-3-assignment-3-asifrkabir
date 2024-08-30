import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CouponService } from "./coupon.service";

const createCoupon = catchAsync(async (req, res) => {
  const result = await CouponService.createCoupon(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Coupon created successfully",
    data: result,
  });
});

const getAllCoupons = catchAsync(async (req, res) => {
  const result = await CouponService.getAllCoupons(req.query);

  if (result?.result?.length <= 0) {
    res.status(httpStatus.OK).json({
      success: false,
      statusCode: httpStatus.OK,
      message: "No data found",
      data: result?.result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupons retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getCouponById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CouponService.getCouponById(id);

  if (!result) {
    res.status(httpStatus.OK).json({
      success: false,
      statusCode: httpStatus.OK,
      message: "No data found",
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon retrieved successfully",
    data: result,
  });
});

const updateCoupon = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CouponService.updateCoupon(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon updated successfully",
    data: result,
  });
});

const deleteCoupon = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CouponService.deleteCoupon(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon deleted successfully",
    data: result,
  });
});

export const CouponController = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};
