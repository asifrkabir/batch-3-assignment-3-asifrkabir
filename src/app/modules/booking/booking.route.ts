import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE_ENUM } from "../user/user.constant";
import { BookingValidations } from "./booking.validation";
import { BookingController } from "./booking.controller";

const router = Router();

router.get("/all", auth(USER_ROLE_ENUM.admin), BookingController.getAllRentals);

router.post(
  "/",
  auth(USER_ROLE_ENUM.admin, USER_ROLE_ENUM.user),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingController.createRental
);

router.put(
  "/:bookingId/return",
  auth(USER_ROLE_ENUM.admin),
  BookingController.returnBike
);

router.get(
  "/",
  auth(USER_ROLE_ENUM.admin, USER_ROLE_ENUM.user),
  BookingController.getAllRentalsByUser
);

router.patch(
  "/:bookingId",
  validateRequest(BookingValidations.updateBookingValidationSchema),
  auth(USER_ROLE_ENUM.admin, USER_ROLE_ENUM.user),
  BookingController.updateRental
);

export const BookingRoutes = router;
