import { Router } from "express";
import routes from "./vehicles.routes";
import * as services from "./vehicles.services";
import * as controllers from "./vehicles.controllers";

const router = Router();
router.use("/", routes);

export { services, controllers };
export default router;
