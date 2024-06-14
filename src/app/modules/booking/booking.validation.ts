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
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
