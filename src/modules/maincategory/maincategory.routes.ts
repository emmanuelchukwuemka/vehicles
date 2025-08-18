import { Router } from "express";
import * as maincategoryControllers from "./maincategory.controllers";

const router = Router();
router.post("/", maincategoryControllers.sample);

export default router;
