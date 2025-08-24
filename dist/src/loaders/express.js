"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("../middlewares/system/errorHandler");
const auth_1 = __importDefault(require("../modules/auth"));
const user_1 = __importDefault(require("../modules/user"));
const categories_1 = __importDefault(require("../modules/categories"));
const forex_1 = __importDefault(require("../modules/forex"));
const continent_1 = __importDefault(require("../modules/continent"));
const region_1 = __importDefault(require("../modules/region"));
const country_1 = __importDefault(require("../modules/country"));
const state_1 = __importDefault(require("../modules/state"));
const city_1 = __importDefault(require("../modules/city"));
const currency_1 = __importDefault(require("../modules/currency"));
exports.default = (app) => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    // Imported modules will be listed here
    app.use("/api/auth", auth_1.default);
    app.use("/api/user", user_1.default);
    app.use("/api/categories", categories_1.default);
    app.use("/api/forex", forex_1.default);
    app.use("/api/continent", continent_1.default);
    app.use("/api/region", region_1.default);
    app.use("/api/country", country_1.default);
    app.use("/api/state", state_1.default);
    app.use("/api/city", city_1.default);
    app.use("/api/currency", currency_1.default);
    app.use(errorHandler_1.errorHandler);
};
