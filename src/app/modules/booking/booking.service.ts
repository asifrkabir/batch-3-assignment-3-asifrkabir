import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { getExistingUserById } from "../user/user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { BikeService } from "../bike/bike.service";
import mongoose from "mongoose";
import { Bike } from "../bike/bike.model";

const createBooking = async (userId: string, payload: Partial<TBooking>) => {
  // check if user exists
  const existingUser = await getExistingUserById(userId);

  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  payload.userId = existingUser?._id;

  // check if bike exists
  const { bikeId } = payload;

  if (!bikeId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Bike ID is required");
  }

  const existingBike = await BikeService.getBikeById(bikeId?.toString());

  if (!existingBike) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike not found");
  }

  if (!existingBike?.isAvailable) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Bike is not available for rent"
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newBooking = await Booking.create([payload], { session });

    if (!newBooking.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create rental");
    }

    const updatedBike = await Bike.findOneAndUpdate(
      { _id: bikeId },
      { isAvailable: false },
      { session }
    );

    if (!updatedBike) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to update bike availability status"
      );
    }

    const bookingObject = (newBooking[0] as any).toObject();

    delete bookingObject.__v;
    delete bookingObject.createdAt;
    delete bookingObject.updatedAt;

    await session.commitTransaction();
    await session.endSession();

    return bookingObject;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();

    throw err;
  }
};

export const BookingService = {
  createBooking,
};
