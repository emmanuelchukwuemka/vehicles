import { Router } from "express";
import * as logisticsController from "./logistics.controller";

const router = Router();

router.post("/add", logisticsController.addCompany);

export default router;
