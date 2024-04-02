import { Router } from "express";
import AdminControllers from "./admin.controller";

const router = Router();

router.get("/", AdminControllers.getAdmins);
router.get("/:id", AdminControllers.getAdminById);
router.patch("/:id", AdminControllers.updateAdminDataById);
router.delete("/:id", AdminControllers.deleteAdminById);

const AdminRoutes = router;
export default AdminRoutes;
