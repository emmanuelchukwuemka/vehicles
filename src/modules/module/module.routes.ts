import { Router } from "express";
import * as moduleControllers from "./controllers/domain.controllers";

import {
  validateIdParam,
  validateModuleCreate,
  validatesubdomainCreate,
} from "./module.middlewares";
import { SubmoduleController } from "./controllers/submodule.controllers";

const router = Router();
router.post("/", validateModuleCreate, moduleControllers.createModule);

// Create a submodule
router.post("/subdomain", validatesubdomainCreate, SubmoduleController.create);

// Update a submodule
router.put("/submodule/:id", SubmoduleController.update);

// Get single submodule by ID
router.get("/submodule/:id", SubmoduleController.getById);

// Get all submodules (optionally filter by module_id)
router.get("/submodule", SubmoduleController.getAll);

// Delete a submodule
router.delete("/submodule/:id", SubmoduleController.delete);

export default router;
