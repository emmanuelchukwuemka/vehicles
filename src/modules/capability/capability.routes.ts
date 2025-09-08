import { Router } from "express";
import * as capabilityControllers from "./capability.controllers";
import { capabilityValidate } from "./capability.middlewares";

const router = Router();
router.post("/", capabilityValidate, capabilityControllers.createCapability);

export default router;
