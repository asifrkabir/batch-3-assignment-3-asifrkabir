import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await BookingService.createBooking(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental created successfully",
    data: result,
  });
});

const returnBike = catchAsync(async (req, res) => {
  const { bookingId } = req.params;

  const result = await BookingService.returnBike(bookingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike returned successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  returnBike,
};
