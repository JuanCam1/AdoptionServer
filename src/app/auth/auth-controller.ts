import type { Request, Response } from "express";
import { registerService } from "./auth-service";


export const registerController = async (req: Request, res: Response) => {
  await registerService(req, res);
}