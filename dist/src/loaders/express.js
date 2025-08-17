"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("../middlewares/system/errorHandler");
const auth_1 = __importDefault(require("../modules/auth"));
const user_1 = __importDefault(require("../modules/user"));
exports.default = (app) => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // Imported modules will be listed here
    app.use("/api/auth", auth_1.default);
    app.use("/api/user", user_1.default);
    app.use(errorHandler_1.errorHandler);
};
