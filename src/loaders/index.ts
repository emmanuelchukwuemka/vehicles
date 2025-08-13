import { Application } from "express";
import expressLoader from "../loaders/express";
import dbLoader from "../loaders/database";
// import eventsLoader from "./events";

export default async (app: Application): Promise<void> => {
  await dbLoader();

  expressLoader(app);

  // eventsLoader();
};
