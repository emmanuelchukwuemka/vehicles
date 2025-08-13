import { Router } from "express";
import * as authController from "../auth/auth.controller";

const router = Router();

// POST /api/marketplace/products
router.post("/login", authController.loginController);

export default router;
