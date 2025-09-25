import { Router } from "express";
import { paystactController } from "../controllers/paystack";

const router = Router();
router.post("/", paystactController.payment);
router.post("/charge/auth", paystactController.auth_charge);

export default router;
