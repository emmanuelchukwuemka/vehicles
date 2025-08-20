import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "../middlewares/system/errorHandler";
import authModule from "../modules/auth";
import userModule from "../modules/user";
import categoriesModule from "../modules/categories";

export default (app: Application): void => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // Imported modules will be listed here
  app.use("/api/auth", authModule);

  app.use("/api/user", userModule);

  app.use("/api/categories", categoriesModule);

  app.use(errorHandler);
};
