import type { Response } from "express";
import { errorMessage, sendErrorResponse } from "./sendResponse";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export const validateErrorCatch = (res: Response, error: unknown) => {
  console.error("✖️", error);
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return sendErrorResponse(res, 400, errorMessage.DATABASE_UNICIDAD);
    }
    if (error.code === "P2025") {
      return sendErrorResponse(res, 404, errorMessage.RECORD_NOT_FOUND);
    }
    return sendErrorResponse(res, 500, errorMessage.DATABASE_KNOWN_ERROR);
  } if (error instanceof PrismaClientValidationError) {
    return sendErrorResponse(res, 400, errorMessage.DATABASE_VALIDATION_ERROR);
  } if (error instanceof PrismaClientInitializationError) {
    return sendErrorResponse(res, 500, errorMessage.DATABASE_CONNECTION_ERROR);
  } if (error instanceof PrismaClientRustPanicError) {
    return sendErrorResponse(res, 500, errorMessage.DATABASE_CRITICAL_ERROR);
  }
  return sendErrorResponse(res, 500, errorMessage.DATABASE_SERVICE_ERROR);
};