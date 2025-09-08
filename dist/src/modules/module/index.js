"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const module_routes_1 = __importDefault(require("./module.routes"));
const module_middlewares_1 = require("./module.middlewares");
const router = (0, express_1.Router)();
router.use("/", module_middlewares_1.moduleSecure, module_routes_1.default);
exports.default = router;
