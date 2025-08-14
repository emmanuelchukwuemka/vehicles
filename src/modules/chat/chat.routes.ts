import { Router } from "express";
import * as chatController from "./chat.controller";
const router = Router();
router.get("/", chatController.testController);
export default router;
