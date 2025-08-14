import { Router } from "express";
import storesRoutes from "./stores.routes";
import reviewsModule from "./reviews";

const router = Router();

router.use("/", storesRoutes);
router.use("/reviews", reviewsModule); 

export default router;
