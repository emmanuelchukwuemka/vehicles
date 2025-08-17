import express, { Application } from "express";
import cors from "cors";
import { errorHandler } from "../middlewares/system/errorHandler";
import authModule from "../modules/auth";
import userModule from "../modules/user";

export default (app: Application): void => {
  app.use(cors());
  app.use(express.json());

  // Imported modules will be listed here
  app.use("/api/auth", authModule);

  app.use("/api/user", userModule);

  app.use(errorHandler);
};
