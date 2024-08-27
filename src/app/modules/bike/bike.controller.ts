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

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeService.getAllBikes(req.query);

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
      message: "Bikes retrieved successfully",
      meta: result.meta,
      data: result.result,
    });
  }
});

const getBikeById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BikeService.getBikeById(id);

  if (!result) {
    res.status(httpStatus.OK).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No data found",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Bike retrieved successfully",
      data: result,
    });
  }
});

const updateBike = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BikeService.updateBike(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike updated successfully",
    data: result,
  });
});

const deleteBike = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BikeService.deleteBike(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike deleted successfully",
    data: result,
  });
});

export const BikeController = {
  createBike,
  getAllBikes,
  getBikeById,
  updateBike,
  deleteBike,
};
