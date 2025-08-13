import { Router } from "express";
import * as storesController from "../stores/stores.controller";

const router = Router();

// POST /api/marketplace/products
router.get("/:id", storesController.getStoreInfo);

export default router;
