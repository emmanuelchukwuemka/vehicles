import { Router } from "express";
import * as variationControllers from "./controllers/variation.controllers";
import { validateProduct } from "./product.middlewares";
import {
  validateFetchProductsByDomain,
  validateProductVariation,
} from "./middleware/variation.middleware";
import { productController } from "./controllers/baseProduct.controller";

const router = Router();
router.post("/", validateProduct, productController.createBaseProduct);

router.get("/:domain", productController.getProductByDomainName);

router.get("/:id", productController.geteBaseProduct);

export default router;
