import { Router } from "express";
import retailerRoutes from "./routes/retailer";
import realEstateRoutes from "./routes/realestate";
import logisticsRoutes from "./routes/logistics";

const router = Router();

///////// Retailer //////////
router.use("/retailer", retailerRoutes);

///////// Real Estate //////////
router.use("/realestate", realEstateRoutes);

///////// Logistics //////////
router.use("/logistics", logisticsRoutes);

export default router;
