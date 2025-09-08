import { Router } from "express";
import * as storeControllers from "./store.controllers";
import { storeValidation, validateIdParam } from "./store.middlewares";

const router = Router();
router.post("/", storeValidation, storeControllers.createStore);
router.get("/:id", validateIdParam, storeControllers.getStoreWithScopes);

export default router;
