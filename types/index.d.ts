import type { Request } from "express";
import type { TokenData } from "../src/models/token.model";

export type CustomRequest = Request & { payload?: TokenData };