import { Router } from "express";
import { validateRetailerProduct } from "../../middleware/retailer";
import { retailerController } from "../../controllers/retailer";

const router = Router();
router.post("/", validateRetailerProduct, retailerController.createProduct);

router.get("/", retailerController.getProducts);

export default router;
