import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  bikeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Bike",
  },
  startTime: {
    type: Date,
    required: true,
  },
  returnTime: {
    type: Date,
    required: true,
    default: null,
  },
  totalCost: {
    type: Number,
    required: true,
    default: 0,
  },
  isReturned: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const Booking = model<TBooking>("Booking", bookingSchema);
