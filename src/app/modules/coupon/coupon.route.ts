import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CouponValidations } from "./coupon.validation";
import { CouponController } from "./coupon.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE_ENUM } from "../user/user.constant";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE_ENUM.admin),
  validateRequest(CouponValidations.createCouponValidationSchema),
  CouponController.createCoupon
);

router.get("/", CouponController.getAllCoupons);

router.get("/:id", CouponController.getCouponById);

router.patch(
  "/:id",
  auth(USER_ROLE_ENUM.admin),
  validateRequest(CouponValidations.updateCouponValidationSchema),
  CouponController.updateCoupon
);

router.delete(
  "/:id",
  auth(USER_ROLE_ENUM.admin),
  CouponController.deleteCoupon
);

export const CouponRoutes = router;
