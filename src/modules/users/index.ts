import { Router } from "express";
import productRoutes from "./users.routes";

const router = Router();

router.use("/", productRoutes);

export default router;
