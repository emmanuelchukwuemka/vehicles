"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreInfo = void 0;
const db_1 = __importDefault(require("../../config/database/db"));
const apiResponse_1 = require("../../globals/utility/apiResponse");
const getStoreInfo = async (store_id) => {
    if (!store_id) {
        return (0, apiResponse_1.errorResponse)("Store ID is required", 400);
    }
    const [result] = await db_1.default.execute("SELECT * FROM stores_table WHERE id = ? LIMIT 1", [store_id]);
    const storeInfo = result.length ? result[0] : null;
    if (!storeInfo) {
        return (0, apiResponse_1.errorResponse)("Store with the provided id could not be found", 400);
    }
    return (0, apiResponse_1.successResponse)("Retrieved successful", storeInfo);
};
exports.getStoreInfo = getStoreInfo;
