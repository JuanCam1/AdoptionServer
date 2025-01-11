// import type { NextFunction, Request, Response } from "express";
// import { sendErrorResponse } from "../utils";
// import type { TokenData } from "../models/token.model";

// export const hasType = (types: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {

//       const dataHeader = req.header("x-user-data");

//       if (!dataHeader) {
//         return sendErrorResponse(res, 403, "Error in authentication: Header missing");
//       }

//       let payload: TokenData;
//       try {
//         payload = JSON.parse(dataHeader);
//       } catch (err) {
//         return sendErrorResponse(res, 403, "Error in authentication: Invalid header format");
//       }

//       if (!payload.rol || typeof payload.rol !== "string" || payload.rol.trim() === "") {
//         return sendErrorResponse(res, 403, "Error in authentication: Invalid role");
//       }

//       // Compara el rol con los tipos permitidos
//       const isAuthorized = types.includes(payload.rol);

//       if (isAuthorized) {
//         return next(); // Si está autorizado, continúa
//       } else {
//         return sendErrorResponse(res, 401, 105, "User is not authorized to perform this action");
//       }
//     } catch (err) {
//       return sendErrorResponse(res, 500, 500, "Unexpected server error");
//     }
//   };
// };