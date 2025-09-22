import { Router } from "express";
import paymentRoutes from "./routes";

const router = Router();
router.use("/", paymentRoutes);

export default router;
