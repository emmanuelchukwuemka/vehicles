import { Router } from "express";
import capabilityRoutes from "./capability.routes";

const router = Router();
router.use("/", capabilityRoutes);

export default router;
