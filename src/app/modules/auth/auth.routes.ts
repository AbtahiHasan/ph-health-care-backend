import { Router } from "express";
import AuthControllers from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import AuthValidations from "./auth.validation";

const router = Router();
router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginInUser
);

const AuthRoutes = router;
export default AuthRoutes;
