"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_routes_1 = __importDefault(require("./order.routes"));
const order_middlewares_1 = require("./order.middlewares");
const router = (0, express_1.Router)();
router.use("/", order_middlewares_1.orderSecure, order_routes_1.default);
exports.default = router;
