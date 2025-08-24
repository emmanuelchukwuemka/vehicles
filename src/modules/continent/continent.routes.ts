import { Router } from "express";
import * as continentControllers from "./continent.controllers";
import { validateContinentUpdate, validateCreatePayload, validateIdParam } from "./continent.middlewares";

const router = Router();
router.post("/", validateCreatePayload, continentControllers.addContinent);

router.get("/", continentControllers.getContinents);

router.get("/:id", validateIdParam, continentControllers.getContinentById);

router.put( "/:id", validateIdParam, validateContinentUpdate, continentControllers.updateContinent);

export default router;
