"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (message, data, statusCode = 200) => ({
    success: true,
    message,
    data,
    statusCode,
});
exports.successResponse = successResponse;
const errorResponse = (message, statusCode = 400, error) => ({
    success: false,
    message,
    error,
    statusCode,
});
exports.errorResponse = errorResponse;
