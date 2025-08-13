import { Router } from "express";
import storesRoutes from "./stores.routes";

const router = Router();

router.use("/", storesRoutes);

export default router;
