require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'u179857929_sys_telnet',
    password: process.env.DB_PASSWORD || 'MiXXYtPj3',
    database: process.env.DB_NAME || 'u179857929_bloomzon_plus',
    host: process.env.DB_HOST || 'srv527.hstgr.io',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: console.log
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME_TEST || 'bloomzon_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306
  },
  production: {
    username: process.env.DB_USER || 'u179857929_sys_telnet',
    password: process.env.DB_PASSWORD || 'MiXXYtPj3',
    database: process.env.DB_NAME || 'u179857929_bloomzon_plus',
    host: process.env.DB_HOST || 'srv527.hstgr.io',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false
  }
};