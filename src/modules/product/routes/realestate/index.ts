// routes/realEstate.routes.ts
import { Router } from "express";
import { RealEstateController } from "../../controllers/realestate";
import { validateCreate } from "../../middleware/realestate";

const router = Router();

router.post("/", validateCreate(), RealEstateController.createProduct);
router.get("/", RealEstateController.getProducts);

export default router;
