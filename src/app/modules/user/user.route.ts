import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE_ENUM } from "./user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = Router();

router.get("/",auth(USER_ROLE_ENUM.admin), UserController.getAllUsers);

router.get(
  "/me",
  auth(USER_ROLE_ENUM.admin, USER_ROLE_ENUM.user),
  UserController.getUserProfile
);

router.put(
  "/me",
  auth(USER_ROLE_ENUM.admin, USER_ROLE_ENUM.user),
  validateRequest(UserValidations.updateUserValidationSchema),
  UserController.updateUserProfile
);

export const UserRoutes = router;
