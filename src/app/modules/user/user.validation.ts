import { z } from "zod";
import { USER_ROLE_LIST } from "./user.constant";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a valid string",
    }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a valid string",
    }),
    phone: z.string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a valid string",
    }),
    address: z.string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a valid string",
    }),
    role: z.enum([...USER_ROLE_LIST] as [string, ...string[]], {
      message: "Please enter a valid role",
      required_error: "Role is required",
    }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z
      .enum([...USER_ROLE_LIST] as [string, ...string[]], {
        message: "Please enter a valid role",
      })
      .optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
