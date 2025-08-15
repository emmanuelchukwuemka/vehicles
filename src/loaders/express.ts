import express, { Application } from "express";
import cors from "cors";

// Import module routes directly
import authModule from "../modules/auth";
import storesModule from "../modules/stores";

export default (app: Application): void => {
  app.use(cors());
  app.use(express.json());

  // Module routes
  app.use("/api/auth", authModule);
  app.use("/api/stores", storesModule);
};
