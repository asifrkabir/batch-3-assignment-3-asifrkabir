import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE_ENUM } from "../user/user.constant";
import { BookingValidations } from "./booking.validation";
import { BookingController } from "./booking.controller";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE_ENUM.admin),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingController.createBooking
);

export const BookingRoutes = router;
