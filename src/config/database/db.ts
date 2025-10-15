import mysql from "mysql2/promise";
import config from "../../../config/config.js";

const env = process.env.NODE_ENV || "development";
const dbConfig = (config as any)[env];

let pool;

if (dbConfig.dialect === 'sqlite') {
  // Dummy pool for SQLite
  pool = {
    getConnection: async () => ({
      query: async () => {},
      release: () => {}
    })
  };
} else {
  pool = mysql.createPool({
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

export default pool as any;
