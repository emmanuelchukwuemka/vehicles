import express, { Application } from "express";
import cors from "cors";
//import morgan from "morgan";
//import errorHandler from "../middlewares/errorHandler";

// Import module routes directly
import authRoutes from "../modules/auth/auth.routes";
import marketplaceProductsRoutes from "../modules/marketplace/products";

export default (app: Application): void => {
  app.use(cors());
  //app.use(morgan("dev"));
  app.use(express.json());

  // Module routes
  app.use("/api/auth", authRoutes);
  app.use("/api/marketplace/products", marketplaceProductsRoutes);

  // Global error handler
  //app.use(errorHandler);
};
