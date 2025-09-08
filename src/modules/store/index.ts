import { Router } from "express";
import storeRoutes from "./store.routes";

const router = Router();
router.use("/", storeRoutes);

export default router;
