import { Router } from "express";
import * as orderControllers from "./order.controllers";

const router = Router();
router.post("/", orderControllers.sample);

export default router;
