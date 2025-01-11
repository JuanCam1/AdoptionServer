import { add, getUnixTime } from "date-fns";
import jwt from "jsonwebtoken";

import type { TokenData, TokenPayload } from "../models/token.model";
import config from "../config/config";

export function createToken(data: TokenData): TokenPayload {
  const payload = {
    ...data,
    exp: getUnixTime(add(new Date(), { days: 1 })),
  };

  const token = jwt.sign(payload, config.TOKEN_SECRET);

  return {
    success: true,
    data: {
      exp: payload.exp,
      token: token,
      payload: data,
    },
  };
}
