import { Router } from "express";
import AdminControllers from "./admin.controller";

const router = Router();

router.get("/", AdminControllers.getAdmins);

const AdminRoutes = router;
export default AdminRoutes;
