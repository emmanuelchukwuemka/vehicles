import express, { Application } from "express";
import cors from "cors";
//import morgan from "morgan";
//import errorHandler from "../middlewares/errorHandler";

// Import module routes directly
import authModule from "../modules/auth";
import storesModule from "../modules/marketplace/stores";
import logisticsModule from "../modules/logistics";

export default (app: Application): void => {
  app.use(cors());
  //app.use(morgan("dev"));
  app.use(express.json());

  // Module routes
  app.use("/api/auth", authModule);
  app.use("/api/stores", storesModule);
  app.use("/api/logistics", logisticsModule);

  // Global error handler
  //app.use(errorHandler);
};
