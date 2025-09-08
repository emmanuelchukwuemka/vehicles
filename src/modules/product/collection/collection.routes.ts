import { Router } from "express";
import * as collectionControllers from "./collection.controllers";
import { validateCollection, validateIdParam } from "./collection.middlewares";

const router = Router();
router.post("/", validateCollection, collectionControllers.createCollection);

router.get(
  "/store/:id",
  validateIdParam,
  collectionControllers.getCollectionsByStore
);

router.get("/:id", validateIdParam, collectionControllers.getCollectionsById);

export default router;
