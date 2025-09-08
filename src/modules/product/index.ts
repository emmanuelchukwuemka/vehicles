import { Router } from "express";
import productRoutes from "./product.routes";

import collectionModule from "./collection";

const router = Router();
router.use("/", productRoutes);

router.use("/collection", collectionModule);

export default router;
