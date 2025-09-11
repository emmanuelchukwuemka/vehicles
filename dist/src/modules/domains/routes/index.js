"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const domain_controllers_1 = require("../controllers/domain.controllers");
const subdomain_controllers_1 = require("../controllers/subdomain.controllers");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.post("/", middleware_1.validateDomainCreate, domain_controllers_1.DomainController.createDomain);
// ///// sub //////////
router.post("/subdomain", middleware_1.validatesubdomainCreate, subdomain_controllers_1.SubdomainController.create);
router.put("/subdomain/:id", middleware_1.validateIdParam, subdomain_controllers_1.SubdomainController.update);
router.get("/subdomain/:id", subdomain_controllers_1.SubdomainController.getById);
router.get("/subdomain", subdomain_controllers_1.SubdomainController.getAll);
router.delete("/subdomain/:id", subdomain_controllers_1.SubdomainController.delete);
exports.default = router;
