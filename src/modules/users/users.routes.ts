import { Router } from "express";
import * as usersController from "./users.controller";

const router = Router();

// POST /api/marketplace/products
router.post("/", usersController.getProfile);

export default router;
