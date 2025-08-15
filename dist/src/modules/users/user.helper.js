"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByAuthId = void 0;
const db_1 = __importDefault(require("../../config/database/db"));
const getUserByAuthId = async (authUserId) => {
    const [rows] = await db_1.default.query("SELECT id, first_name, last_name, email, phone FROM users_table WHERE id = ? LIMIT 1", [authUserId]);
    return rows.length ? rows[0] : null;
};
exports.getUserByAuthId = getUserByAuthId;
