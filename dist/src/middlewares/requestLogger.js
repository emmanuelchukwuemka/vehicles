"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const uuid_1 = require("uuid");
const logger_1 = __importDefault(require("../utils/logger"));
const requestLogger = (req, res, next) => {
    const requestId = (0, uuid_1.v4)();
    req.requestId = requestId;
    const start = Date.now();
    logger_1.default.info(`Request started`, {
        requestId,
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger_1.default.info(`Request completed`, {
            requestId,
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration: `${duration}ms`
        });
    });
    next();
};
exports.requestLogger = requestLogger;
