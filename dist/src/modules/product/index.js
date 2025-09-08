"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_routes_1 = __importDefault(require("./product.routes"));
const collection_1 = __importDefault(require("./collection"));
const router = (0, express_1.Router)();
router.use("/", product_routes_1.default);
router.use("/collection", collection_1.default);
exports.default = router;
