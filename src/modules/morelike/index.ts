import { Router } from "express";
import morelikeRoutes from "./morelike.routes";
import { morelikeSecure } from "./morelike.middlewares";

const router = Router();
router.use("/", morelikeSecure, morelikeRoutes);

export default router;
