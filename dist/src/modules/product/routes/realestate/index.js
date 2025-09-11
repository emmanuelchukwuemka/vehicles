"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/realEstate.routes.ts
const express_1 = require("express");
const realestate_1 = require("../../controllers/realestate");
const realestate_2 = require("../../middleware/realestate");
const router = (0, express_1.Router)();
router.post("/", (0, realestate_2.validateCreate)(), realestate_1.RealEstateController.createProduct);
router.get("/", realestate_1.RealEstateController.getProducts);
exports.default = router;
