import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "../middlewares/system/errorHandler";
import { requestLogger } from "../middlewares/requestLogger";
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
import bannerModule from "../modules/banner";
import productModule from "../modules/product";
import storeModule from "../modules/store";
import capabilityModule from "../modules/capability";
import vendorModule from "../modules/vendor";
import domainModule from "../modules/domains";
import cartModule from "../modules/cart";
import { verifyCookie } from "../middlewares/cookie.middleware";
import morelikeModule from "../modules/morelike";
import vehiclesModule from "../modules/vehicles";

export default (app: Application): void => {
  app.use(cors());
  app.use(requestLogger);
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

  app.use("/api/banner", bannerModule);

  app.use("/api/product", productModule);

  app.use("/api/store", storeModule);

  app.use("/api/capability", capabilityModule);

  app.use("/api/vendor", vendorModule);

  app.use("/api/domain", domainModule);

  app.use("/api/cart", verifyCookie, cartModule);


  app.use("/api/morelike", morelikeModule);

  app.use("/api/v1", vehiclesModule);

  app.use(errorHandler);
};
