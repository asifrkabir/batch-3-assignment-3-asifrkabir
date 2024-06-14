import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(UserValidations.createUserValidationSchema),
  UserController.createUser
);

export const UserRoutes = router;
