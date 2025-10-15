import sequelize from "../config/database/sequelize"; // Sequelize ORM connection
import pool from "../config/database/db"; // MySQL2 raw connection
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function checkDatabaseConnections() {
  try {
    // Test Sequelize ORM connection
    await sequelize.authenticate();
    console.log("ORM DB connected");

    // Test raw connection only if not SQLite
    const env = process.env.NODE_ENV || "development";
    const config = require("../../config/config.js");
    const dbConfig = (config as any)[env];

    if (dbConfig.dialect !== 'sqlite') {
      const connection = await pool.getConnection();
      try {
        console.log("Raw SQL DB connected");
      } finally {
        connection.release();
      }
    } else {
      console.log("Using SQLite, skipping raw connection test");
    }

    // Run migrations if RUN_MIGRATIONS is set to true
    if (process.env.RUN_MIGRATIONS === 'true') {
      console.log("Running database migrations...");
      try {
        await execAsync('npx sequelize-cli db:migrate');
        console.log("Database migrations completed successfully");
      } catch (migrationError) {
        console.error("Migration failed:", migrationError);
        // Don't exit on migration failure, let the app start
      }
    }
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1); // Here am exiting the app if DB is not reachable
  }
}
