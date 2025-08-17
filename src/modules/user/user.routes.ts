import { Router } from "express";
import * as userControllers from "./user.controllers";
import { userSecure } from "./user.middlewares";
import { verifyCookie } from "../../middlewares/cookie.middleware";

const router = Router();
router.post("/signup", userSecure, userControllers.signupController);
router.get("/profile", userSecure, verifyCookie, userControllers.profile);

export default router;
