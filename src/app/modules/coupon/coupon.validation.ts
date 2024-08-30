import { z } from "zod";

const createCouponValidationSchema = z.object({
  body: z.object({
    code: z
      .string({
        required_error: "Coupon Code is required",
        invalid_type_error: "Coupon Code must be a valid string",
      })
      .min(1, { message: "Coupon Code is required" }),
    discountPercentage: z
      .number({
        required_error: "Discount Percentage is required",
        invalid_type_error: "Discount Percentage must be a valid number",
      })
      .min(1, "Discount Percentage must be at least 1")
      .max(100, "Discount Percentage cannot be greater than 100"),
    // startTime: z
    //   .string({
    //     required_error: "Start time is required",
    //     invalid_type_error: "Start time must be a valid date",
    //   })
    //   .datetime(),
    // endTime: z
    //   .string({
    //     required_error: "End time is required",
    //     invalid_type_error: "End time must be a valid date",
    //   })
    //   .datetime(),
  }),
});

const updateCouponValidationSchema = z.object({
  body: z.object({
    code: z
      .string({
        invalid_type_error: "Coupon Code must be a valid string",
      })
      .min(1, { message: "Coupon Code is required" })
      .optional(),
    discountPercentage: z
      .number({
        invalid_type_error: "Discount Percentage must be a valid number",
      })
      .min(1, "Discount Percentage must be at least 1")
      .max(100, "Discount Percentage cannot be greater than 100")
      .optional(),
    // startTime: z
    //   .string({
    //     invalid_type_error: "Start time must be a valid date",
    //   })
    //   .datetime()
    //   .optional(),
    // endTime: z
    //   .string({
    //     invalid_type_error: "End time must be a valid date",
    //   })
    //   .datetime()
    //   .optional(),
  }),
});

export const CouponValidations = {
  createCouponValidationSchema,
  updateCouponValidationSchema,
};
