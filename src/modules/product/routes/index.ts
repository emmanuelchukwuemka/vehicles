import { Router } from "express";
import { ProductController, ProductUnitController } from "../controllers";

const router = Router();

router.get("/:id", ProductController.getSingleProduct);
router.get("/unit/:id", ProductUnitController.getSingleUnit);

export default router;
