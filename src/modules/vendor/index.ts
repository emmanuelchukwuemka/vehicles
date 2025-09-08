import { Router } from "express";
import vendorRoutes from "./vendor.routes";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
router.use("/", vendorRoutes);

export default router;
