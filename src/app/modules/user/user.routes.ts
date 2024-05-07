import { Router } from "express";
import UserController from "./user.controller";
import { fileUploader } from "../../helper/fileUploader";
import bodyDataParser from "../../middleware/bodyDataParser";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";

const router = Router();

router.post(
  "/create-admin",
  fileUploader.upload.single("file"),
  bodyDataParser,
  validateRequest(UserValidation.createAdminSchema),
  UserController.createAdmin
);

const UserRoutes = router;
export default UserRoutes;
