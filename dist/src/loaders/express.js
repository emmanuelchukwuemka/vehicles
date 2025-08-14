"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//import morgan from "morgan";
//import errorHandler from "../middlewares/errorHandler";
// Import module routes directly
const auth_1 = __importDefault(require("../modules/auth"));
const stores_1 = __importDefault(require("../modules/stores"));
exports.default = (app) => {
    app.use((0, cors_1.default)());
    //app.use(morgan("dev"));
    app.use(express_1.default.json());
    // Module routes
    app.use("/api/auth", auth_1.default);
    app.use("/api/stores", stores_1.default);
    // Global error handler
    //app.use(errorHandler);
};
