"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const db_1 = __importDefault(require("../../config/database/db"));
const getProfile = async (data) => {
    const { name, price, description } = data;
    const [result] = await db_1.default.query("INSERT INTO products (name, price, description) VALUES (?, ?, ?)", [name, price, description || null]);
    return { id: result.insertId, name, price, description };
};
exports.getProfile = getProfile;
