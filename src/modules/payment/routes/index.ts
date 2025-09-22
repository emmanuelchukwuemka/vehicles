import { Router } from "express";
import { paystactController } from "../controllers/paystack";

const router = Router();
router.post("/initialize", paystactController.initialize);
router.post("/validation/pin", paystactController.validatePin);
router.post("/validation/otp", paystactController.validateOtp);
router.post("/charge/auth", paystactController.auth_charge);

export default router;
