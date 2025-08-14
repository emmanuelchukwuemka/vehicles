import { Request, Response } from "express";
import * as storesService from "./stores.service";

export const getStoreInfo = async (req: Request, res: Response) => {
  const storeId = Number(req.params.id);

  const result = await storesService.getStoreInfo(storeId);

  return res
    .status(result.statusCode || (result.success ? 200 : 400))
    .json(result);
};
