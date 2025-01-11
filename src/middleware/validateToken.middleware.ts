import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { getUnixTime } from "date-fns";

import { sendErrorResponse } from "./../utils";
import config from "../config/config";

import type { CustomRequest } from "../../types";
import type { TokenData } from "../models/token.model";

export const validateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return sendErrorResponse(res, 403, "Request is missing authorization header");
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const data = jwt.verify(token, config.TOKEN_SECRET) as TokenData;
    if (!data.exp) return sendErrorResponse(res, 401, "invalided token");

    if (data.exp <= getUnixTime(new Date())) {
      return sendErrorResponse(res, 401, "Expired token");
    }
    req.payload = data;
    next();
  } catch (err) {
    return sendErrorResponse(res, 403, `${err}`.substring(7));
  }
};