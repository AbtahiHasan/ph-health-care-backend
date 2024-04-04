import { Router } from "express";
import UserRoutes from "../modules/user/user.routes";
import AdminRoutes from "../modules/admin/admin.routes";
import AuthRoutes from "../modules/auth/auth.routes";

type TRoute = {
  path: string;
  route: any;
};
const router = Router();

const moduleRoutes: TRoute[] = [
  { path: "/auth", route: AuthRoutes },
  { path: "/user", route: UserRoutes },
  { path: "/admin", route: AdminRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
