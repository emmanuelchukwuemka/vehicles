import { Router } from "express";
import { paystactController } from "../controllers/paystack";

const router = Router();
router.post("/", paystactController.payment);

export default router;
