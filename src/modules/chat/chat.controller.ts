import { Request, Response } from "express";
import * as chatService from "./chat.service";
export const testController = async (req: Request, res: Response) => {
  const result = await chatService.testMethod();
  return res
    .status(result.statusCode || (result.success ? 200 : 400))
    .json(result);
};
