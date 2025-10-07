import { Router } from "express";
import * as morelikeControllers from "./morelike.controllers";

const router = Router();
router.get("/:subcategory_id", morelikeControllers.getProductsBySubcategory);

export default router;
