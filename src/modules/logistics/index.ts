import { Router } from "express";
import logisticsRoutes from "./logistics.routes";

const router = Router();

router.use("/", logisticsRoutes);

export default router;
