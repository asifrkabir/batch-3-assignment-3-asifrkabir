import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const createRental = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await BookingService.createRental(userId, req.body);

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

const getAllRentalsByUser = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await BookingService.getAllRentalsByUser(userId);

  if (result.length > 0) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rentals retrieved successfully",
      data: result,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "No Data Found",
      data: result,
    });
  }
});

export const BookingController = {
  createRental,
  returnBike,
  getAllRentalsByUser,
};
