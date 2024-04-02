import { Router } from "express";
import AdminControllers from "./admin.controller";

const router = Router();

router.get("/", AdminControllers.getAdmins);
router.get("/:id", AdminControllers.getAdminById);

const AdminRoutes = router;
export default AdminRoutes;
