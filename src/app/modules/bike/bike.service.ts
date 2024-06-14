import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBike = async (payload: TBike) => {
  const result = await Bike.create(payload);

  const bikeObject = (result as any).toObject();

  delete bikeObject.__v;
  delete bikeObject.createdAt;
  delete bikeObject.updatedAt;

  return bikeObject;
};

const getAllBikes = async () => {
  const result = await Bike.find().select(["-__v", "-createdAt", "-updatedAt"]);

  return result;
};

const updateBike = async (id: string, payload: Partial<TBike>) => {
  if (!(await Bike.findById(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike not found!");
  }

  const result = await Bike.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).select(["-__v", "-createdAt", "-updatedAt"]);

  return result;
};

const deleteBike = async (id: string) => {
  if (!(await Bike.findById(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike not found!");
  }

  const result = await Bike.findOneAndDelete({ _id: id }).select([
    "-__v",
    "-createdAt",
    "-updatedAt",
  ]);

  return result;
};

export const getBikeById = async (id: string) => {
  const result = await Bike.findById(id);

  return result;
};

export const BikeService = {
  createBike,
  getAllBikes,
  updateBike,
  deleteBike,
  getBikeById,
};
