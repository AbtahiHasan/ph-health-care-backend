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
router.get(
  "/refresh-token",
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

const AuthRoutes = router;
export default AuthRoutes;
