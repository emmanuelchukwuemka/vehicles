"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviews_routes_1 = __importDefault(require("./reviews.routes"));
const router = (0, express_1.Router)();
router.use("/", reviews_routes_1.default);
exports.default = router;
