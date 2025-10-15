"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkDatabaseConnections;
const sequelize_1 = __importDefault(require("../config/database/sequelize"));
const db_1 = __importDefault(require("../config/database/db"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
async function checkDatabaseConnections() {
    try {
        await sequelize_1.default.authenticate();
        console.log("ORM DB connected");
        const env = process.env.NODE_ENV || "development";
        const config = require("../../config/config.js");
        const dbConfig = config[env];
        if (dbConfig.dialect !== 'sqlite') {
            const connection = await db_1.default.getConnection();
            try {
                console.log("Raw SQL DB connected");
            }
            finally {
                connection.release();
            }
        }
        else {
            console.log("Using SQLite, skipping raw connection test");
        }
        if (process.env.RUN_MIGRATIONS === 'true') {
            console.log("Running database migrations...");
            try {
                await execAsync('npx sequelize-cli db:migrate');
                console.log("Database migrations completed successfully");
            }
            catch (migrationError) {
                console.error("Migration failed:", migrationError);
            }
        }
    }
    catch (err) {
        console.error("DB connection failed:", err);
        process.exit(1);
    }
}
