import { Router } from "express";
import * as productController from "./product.controller";

const router = Router();

// GET /api/marketplace/products
router.get("/", productController.getAllProducts);

// POST /api/marketplace/products
router.post("/", productController.createProduct);

export default router;
