import { Router } from "express";
import UserController from "./user.controller";

const router = Router();

router.post("/create-admin", UserController.createAdmin);

const UserRoutes = router;
export default UserRoutes;
