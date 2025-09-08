import { Router } from "express";
import * as vendorControllers from "./vendor.controllers";
import { createVendorValidation, validateUpate } from "./vendor.middlewares";

const router = Router();
router.post("/", createVendorValidation, vendorControllers.createVendor);

router.patch("/suspend", validateUpate, vendorControllers.suspendVendor);

export default router;
