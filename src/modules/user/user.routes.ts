import { Router } from "express";
import * as userControllers from "./user.controllers";
import { userSecure } from "./user.middlewares";

const router = Router();
router.get("/signup", userSecure, userControllers.signupController);

export default router;
