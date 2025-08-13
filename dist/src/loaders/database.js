"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkDatabaseConnections;
const sequelize_1 = __importDefault(require("../config/database/sequelize")); // Sequelize ORM connection
const db_1 = __importDefault(require("../config/database/db")); // MySQL2 raw connection
async function checkDatabaseConnections() {
    try {
        // Test Sequelize ORM connection
        await sequelize_1.default.authenticate();
        console.log("ORM DB connected");
        // Test raw MySQL2 connection
        const connection = await db_1.default.getConnection();
        try {
            console.log("Raw SQL DB connected");
        }
        finally {
            connection.release();
        }
    }
    catch (err) {
        console.error("DB connection failed:", err);
        process.exit(1); // Here am exiting the app if DB is not reachable
    }
}
