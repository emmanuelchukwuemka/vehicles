"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const morelike_routes_1 = __importDefault(require("./morelike.routes"));
const morelike_middlewares_1 = require("./morelike.middlewares");
const router = (0, express_1.Router)();
router.use("/", morelike_middlewares_1.morelikeSecure, morelike_routes_1.default);
exports.default = router;
