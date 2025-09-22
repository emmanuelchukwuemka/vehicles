import { Router } from "express";
import orderRoutes from "./order.routes";
import { orderSecure } from "./order.middlewares";

const router = Router();
router.use("/", orderSecure, orderRoutes);

export default router;
