import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "../middlewares/system/errorHandler";
import authModule from "../modules/auth";
import userModule from "../modules/user";
import maincategoryModule from "../modules/maincategory";

export default (app: Application): void => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // Imported modules will be listed here
  app.use("/api/auth", authModule);

  app.use("/api/user", userModule);

  app.use("/api/maincategory", maincategoryModule);

  app.use(errorHandler);
};
