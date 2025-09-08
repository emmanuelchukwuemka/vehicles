import { Router } from "express";
import collectionRoutes from "./collection.routes";

const router = Router();
router.use("/", collectionRoutes);

export default router;
