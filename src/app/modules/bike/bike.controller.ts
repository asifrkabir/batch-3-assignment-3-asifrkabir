import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BikeService } from "./bike.service";

const createBike = catchAsync(async (req, res) => {
  const result = await BikeService.createBike(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike added successfully",
    data: result,
  });
});

export const BikeController = {
  createBike,
};
