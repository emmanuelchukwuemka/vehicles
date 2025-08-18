import { Router } from "express";
import maincategoryRoutes from "./maincategory.routes";
import { maincategorySecure } from "./maincategory.middlewares";

const router = Router();
router.use("/", maincategorySecure, maincategoryRoutes);

export default router;
