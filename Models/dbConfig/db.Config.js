require("dotenv").config();
const mysql = require("mysql2");

module.exports = 
    
    mysql.createPool({
        connectionLimit : 100, //important
        host: process.env.dbHost,
     
        user: process.env.dbUser,
     
        password: process.env.dbPassword,
     
        database: process.env.database
     
     })
