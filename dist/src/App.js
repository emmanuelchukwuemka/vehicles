"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loaders_1 = __importDefault(require("./loaders"));
const app = (0, express_1.default)();
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});
app.get("/healthz", (req, res) => {
    res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});
(async () => {
    await (0, loaders_1.default)(app);
})();
exports.default = app;
