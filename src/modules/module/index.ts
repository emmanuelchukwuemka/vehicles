import { Router } from "express";
import moduleRoutes from "./module.routes";
import { moduleSecure } from "./module.middlewares";

const router = Router();
router.use("/", moduleSecure, moduleRoutes);

export default router;
