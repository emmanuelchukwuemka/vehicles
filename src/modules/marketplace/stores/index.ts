import { Router } from "express";
import storesRoutes from "./stores.routes";
import reviewsRoutes from "./reviews";

const router = Router();

router.use("/", storesRoutes);
router.use("/reviews", reviewsRoutes); // /api/stores/reviews

export default router;
