import { Router } from "express";
import cartRoutes from "./routes";
import { checkUserMatch, checkUserStatus } from "../../middlewares/user";

const router = Router();
router.use("/", checkUserStatus, checkUserMatch, cartRoutes);

export default router;
