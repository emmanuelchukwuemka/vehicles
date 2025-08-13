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
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const products_1 = __importDefault(require("../modules/marketplace/products"));
exports.default = (app) => {
    app.use((0, cors_1.default)());
    //app.use(morgan("dev"));
    app.use(express_1.default.json());
    // Module routes
    app.use("/api/auth", auth_routes_1.default);
    app.use("/api/marketplace/products", products_1.default);
    // Global error handler
    //app.use(errorHandler);
};
