import { Router } from "express";
import * as productControllers from "./controllers/baseProduct.controller";
import * as variationControllers from "./controllers/variation.controllers";
import { validateProduct } from "./product.middlewares";
import { validateProductVariation } from "./middleware/variation.middleware";

const router = Router();
router.post("/", validateProduct, productControllers.createBaseProduct);

router.post(
  "/variation",
  validateProductVariation,
  variationControllers.variationController
);

// router.post(
//   "/variation/attribute",
//   validateAttribute,
//   productControllers.addAttributes
// );

// router.patch(
//   "/variation",
//   validateProductUpdate,
//   productControllers.updateProductVariation
// );

export default router;
