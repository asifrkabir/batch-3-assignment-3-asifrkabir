import { z } from "zod";

const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a valid string",
    }),
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a valid string",
    }),
    pricePerHour: z.number({
      required_error: "Price per hour is required",
      invalid_type_error: "Price per hour must be a valid number",
    }),
    isAvailable: z.boolean().optional(),
    cc: z.number({
      required_error: "CC is required",
      invalid_type_error: "CC must be a valid number",
    }),
    year: z.number({
      required_error: "Year is required",
      invalid_type_error: "Year must be a valid number",
    }),
    model: z.string({
      required_error: "Model is required",
      invalid_type_error: "Model must be a valid string",
    }),
    brand: z.string({
      required_error: "Brand is required",
      invalid_type_error: "Brand must be a valid string",
    }),
    image: z
      .string({ invalid_type_error: "Image URL must be a valid string" })
      .optional(),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    isAvailable: z.boolean().optional(),
    cc: z.number().optional(),
    year: z.number().optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const BikeValidations = {
  createBikeValidationSchema,
  updateBikeValidationSchema,
};
