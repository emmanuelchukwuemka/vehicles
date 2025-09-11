import { Router } from "express";
import retailerRoutes from "./routes/retailer";
import realEstateRoutes from "./routes/realestate";

const router = Router();

////////// Base /////////

///////// Retailer //////////
router.use("/retailer", retailerRoutes);

///////// Real Estate //////////
router.use("/realestate", realEstateRoutes);

export default router;
