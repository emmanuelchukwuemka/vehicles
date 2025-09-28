"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("./routes"));
const retailer_1 = __importDefault(require("./routes/retailer"));
const realestate_1 = __importDefault(require("./routes/realestate"));
const logistics_1 = __importDefault(require("./routes/logistics"));
const router = (0, express_1.Router)();
///////// Retailer //////////
router.use("/retailer", retailer_1.default);
///////// Real Estate //////////
router.use("/realestate", realestate_1.default);
///////// Logistics //////////
router.use("/logistics", logistics_1.default);
///////// Main //////////
router.use("/", routes_1.default);
exports.default = router;
