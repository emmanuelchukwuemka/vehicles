import sequelize from "../config/database/sequelize"; // Sequelize ORM connection
import pool from "../config/database/db"; // MySQL2 raw connection

export default async function checkDatabaseConnections() {
  try {
    // Test Sequelize ORM connection
    await sequelize.authenticate();
    console.log("ORM DB connected");

    // Test raw MySQL2 connection
    const connection = await pool.getConnection();
    try {
      console.log("Raw SQL DB connected");
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1); // Here am exiting the app if DB is not reachable
  }
}
