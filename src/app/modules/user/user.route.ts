import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE_ENUM } from "./user.constant";

const router = Router();

router.get(
  "/me",
  auth(USER_ROLE_ENUM.admin, USER_ROLE_ENUM.user),
  UserController.getUserProfile
);

export const UserRoutes = router;
