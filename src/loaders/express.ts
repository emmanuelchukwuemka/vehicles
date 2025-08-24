import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "../middlewares/system/errorHandler";
import authModule from "../modules/auth";
import userModule from "../modules/user";
import categoriesModule from "../modules/categories";
import forexModule from "../modules/forex";
import continentModule from "../modules/continent";
import regionModule from "../modules/region";
import countryModule from "../modules/country";
import stateModule from "../modules/state";
import cityModule from "../modules/city";
import currencyModule from "../modules/currency";

export default (app: Application): void => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // Imported modules will be listed here
  app.use("/api/auth", authModule);

  app.use("/api/user", userModule);

  app.use("/api/categories", categoriesModule);

  app.use("/api/forex", forexModule);

  app.use("/api/continent", continentModule);

  app.use("/api/region", regionModule);

  app.use("/api/country", countryModule);

  app.use("/api/state", stateModule);

  app.use("/api/city", cityModule);

  app.use("/api/currency", currencyModule);

  app.use(errorHandler);
};
