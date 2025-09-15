// routes/realEstate.routes.ts
import { Router } from "express";
import { logisticsController } from "../../controllers/logistics";
import { validateLogisticsProduct } from "../../middleware/logistics";

const router = Router();

router.post("/", validateLogisticsProduct, logisticsController.createProduct);

router.get("/", logisticsController.getServices);

export default router;
