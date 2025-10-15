"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config = require("../../../config/config.js");
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];
const sequelize = new sequelize_1.Sequelize(dbConfig.database || dbConfig.storage, // for SQLite, storage is used
dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: dbConfig.logging,
    storage: dbConfig.storage, // for SQLite
    pool: dbConfig.pool || {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
exports.default = sequelize;
