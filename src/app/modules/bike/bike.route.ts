import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BikeController } from "./bike.controller";
import { BikeValidations } from "./bike.validation";
import { USER_ROLE_ENUM } from "../user/user.constant";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE_ENUM.admin),
  validateRequest(BikeValidations.createBikeValidationSchema),
  BikeController.createBike
);

router.get("/", BikeController.getAllBikes);

router.put(
  "/:id",
  auth(USER_ROLE_ENUM.admin),
  validateRequest(BikeValidations.createBikeValidationSchema),
  BikeController.updateBike
);

router.delete("/:id", auth(USER_ROLE_ENUM.admin), BikeController.deleteBike);

export const BikeRoutes = router;
