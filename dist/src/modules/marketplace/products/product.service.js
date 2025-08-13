"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getAllProducts = void 0;
const db_1 = __importDefault(require("../../../config/database/db"));
const getAllProducts = async () => {
    const [rows] = await db_1.default.query("SELECT * FROM products");
    return rows;
};
exports.getAllProducts = getAllProducts;
const createProduct = async (data) => {
    const { name, price, description } = data;
    const [result] = await db_1.default.query("INSERT INTO products (name, price, description) VALUES (?, ?, ?)", [name, price, description || null]);
    return { id: result.insertId, name, price, description };
};
exports.createProduct = createProduct;
