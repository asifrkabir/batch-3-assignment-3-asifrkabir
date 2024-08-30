import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    bikeId: z.string({
      required_error: "Bike ID is required",
      invalid_type_error: "Bike ID must be a valid string",
    }),
    startTime: z
      .string({
        required_error: "Start time is required",
        invalid_type_error: "Start time must be a valid date",
      })
      .datetime(),
    paymentAmount: z.number({
      required_error: "Payment amount is required",
      invalid_type_error: "Payment amount must be a valid number",
    }),
  }),
});

const updateBookingValidationSchema = z.object({
  body: z.object({
    paymentAmount: z.number({
      required_error: "Payment amount is required",
      invalid_type_error: "Payment amount must be a valid number",
    }),
    paymentStatus: z.string({
      required_error: "Payment Status is required",
      invalid_type_error: "Payment Status must be a string",
    }),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
