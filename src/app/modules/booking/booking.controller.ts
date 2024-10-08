import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const getAllRentals = catchAsync(async (req, res) => {
  const result = await BookingService.getAllRentals(req.query);

  if (result?.result?.length <= 0) {
    res.status(httpStatus.OK).json({
      success: false,
      statusCode: httpStatus.OK,
      message: "No Data Found",
      data: result?.result,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rentals retrieved successfully",
      meta: result.meta,
      data: result.result,
    });
  }
});

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

  const result = await BookingService.getAllRentalsByUser(userId, req.query);

  if (result?.result?.length <= 0) {
    res.status(httpStatus.OK).json({
      success: false,
      statusCode: httpStatus.OK,
      message: "No Data Found",
      data: result?.result,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rentals retrieved successfully",
      meta: result.meta,
      data: result.result,
    });
  }
});

const updateRental = catchAsync(async (req, res) => {
  const { bookingId } = req.params;

  const result = await BookingService.updateRental(bookingId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental updated successfully",
    data: result,
  });
});

export const BookingController = {
  getAllRentals,
  createRental,
  returnBike,
  getAllRentalsByUser,
  updateRental,
};
