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

export const BikeService = {
  createBike,
  getAllBikes,
};
