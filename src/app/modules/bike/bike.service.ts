/* eslint-disable  @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { bikeSearchableFields } from "./bike.constant";

const createBike = async (payload: TBike) => {
  const result = await Bike.create(payload);

  const bikeObject = (result as any).toObject();

  delete bikeObject.__v;
  delete bikeObject.createdAt;
  delete bikeObject.updatedAt;

  return bikeObject;
};

const getAllBikes = async (query: Record<string, unknown>) => {
  const bikeQuery = new QueryBuilder(Bike.find(), query)
    .search(bikeSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bikeQuery.modelQuery;
  const meta = await bikeQuery.countTotal();

  return {
    meta,
    result,
  };
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
