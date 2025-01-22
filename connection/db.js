const mysql = require('mysql2/promise');
require('dotenv').config();

// Create MySQL pool
module.exports.pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: process.env.SHOULD_WAIT_FOR_CONNECTION,
    connectionLimit: process.env.CONNECTION_LIMIT,
    maxIdle: process.env.DB_MAX_IDLE,
    idleTimeout: process.env.DB_IDLE_TIMEOUT,
    queueLimit: process.env.DB_QUEUE_LIMIT,
    enableKeepAlive: process.env.ENABLE_KEEP_ALIVE,
    keepAliveInitialDelay: process.env.KEEP_ALIVE_INITIAL_DELAY,
});

// Log the created pool
//console.log('MySQL Pool:', module.exports.pool);