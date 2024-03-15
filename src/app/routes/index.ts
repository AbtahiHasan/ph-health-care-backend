import { Router } from "express";
import UserRoutes from "../modules/user/user.routes";

type TRoute = {
  path: string;
  route: any;
};
const router = Router();

const moduleRoutes: TRoute[] = [{ path: "/user", route: UserRoutes }];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
