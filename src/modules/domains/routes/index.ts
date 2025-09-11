import { Router } from "express";
import { DomainController } from "../controllers/domain.controllers";
import { SubdomainController } from "../controllers/subdomain.controllers";
import {
  validateDomainCreate,
  validateIdParam,
  validatesubdomainCreate,
} from "../middleware";

const router = Router();
router.post("/", validateDomainCreate, DomainController.createDomain);

// ///// sub //////////
router.post("/subdomain", validatesubdomainCreate, SubdomainController.create);
router.put("/subdomain/:id", validateIdParam, SubdomainController.update);
router.get("/subdomain/:id", SubdomainController.getById);
router.get("/subdomain", SubdomainController.getAll);
router.delete("/subdomain/:id", SubdomainController.delete);

export default router;
