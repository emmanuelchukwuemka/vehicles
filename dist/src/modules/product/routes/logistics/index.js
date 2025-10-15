"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logistics_1 = require("../../controllers/logistics");
const logistics_2 = require("../../middleware/logistics");
const router = (0, express_1.Router)();
router.post("/", logistics_2.validateLogisticsProduct, logistics_1.logisticsController.createProduct);
router.get("/", logistics_1.logisticsController.getServices);
exports.default = router;
