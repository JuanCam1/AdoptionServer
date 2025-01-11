import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { sendErrorResponse } from "../utils";

export const validationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) sendErrorResponse(res, 400, "Request has invalid");
  next();
};
