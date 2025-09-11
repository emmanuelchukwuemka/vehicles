"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const retailer_1 = require("../../middleware/retailer");
const retailer_2 = require("../../controllers/retailer");
const router = (0, express_1.Router)();
router.post("/", retailer_1.validateRetailerProduct, retailer_2.retailerController.createProduct);
router.get("/", retailer_2.retailerController.getProducts);
exports.default = router;
