import { Router } from "express";
import { cartController } from "../controller";
import { validateCartInput } from "../middleware";
import { addCartItemSchema, updateCartItemSchema } from "../validations";

const router = Router();
router.post("/", validateCartInput(addCartItemSchema), cartController.addItem);
router.get("/", cartController.getCart);
router.put(
  "/",
  validateCartInput(updateCartItemSchema),
  cartController.updateItem
);
router.delete("/", cartController.removeItem);
router.post("/clear", cartController.clearCart);

export default router;
