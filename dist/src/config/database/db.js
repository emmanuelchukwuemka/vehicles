"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const config_js_1 = __importDefault(require("../../../config/config.js"));
const env = process.env.NODE_ENV || "development";
const dbConfig = config_js_1.default[env];
let pool;
if (dbConfig.dialect === 'sqlite') {
    pool = {
        getConnection: async () => ({
            query: async () => { },
            release: () => { }
        })
    };
}
else {
    pool = promise_1.default.createPool({
        host: dbConfig.host,
        user: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        waitForConnections: Boolean(process.env.SHOULD_WAIT_FOR_CONNECTION),
        connectionLimit: Number(process.env.CONNECTION_LIMIT) || 10,
        maxIdle: Number(process.env.DB_MAX_IDLE) || 10,
        idleTimeout: Number(process.env.DB_IDLE_TIMEOUT) || 60000,
        queueLimit: Number(process.env.DB_QUEUE_LIMIT) || 0,
        enableKeepAlive: Boolean(process.env.ENABLE_KEEP_ALIVE),
        keepAliveInitialDelay: Number(process.env.KEEP_ALIVE_INITIAL_DELAY) || 0,
    });
}
exports.default = pool;
