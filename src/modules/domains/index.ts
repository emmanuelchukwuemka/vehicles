import { Router } from "express";
import moduleRoutes from "./routes";

const router = Router();
router.use("/", moduleRoutes);

export default router;
