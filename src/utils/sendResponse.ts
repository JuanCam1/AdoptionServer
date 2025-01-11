import type { Response } from "express";

export const sendErrorResponse = (res: Response, status: number, message: errorMessage) => {
  return res.status(status).json({ success: false, error: { message } });
};

export const sendSuccesResponse = <T>(res: Response, status: number, data: T) => {
  return res.status(status).json({ success: true, data: data });
};



export enum errorMessage {
  ALREADY_EXIST = "already exist",
  NOT_FOUND = "not found",
  ERROR = "error",
  DATABASE_UNICIDAD = "Uniqueness violation in the database",
  RECORD_NOT_FOUND = "Record not found",
  DATABASE_KNOWN_ERROR = "Known error in the database",
  DATABASE_VALIDATION_ERROR = "Validation error in the database query",
  DATABASE_CONNECTION_ERROR = "Error connecting to the database",
  DATABASE_CRITICAL_ERROR = "Critical error in the database engine",
  DATABASE_SERVICE_ERROR = "Database service error",
}
