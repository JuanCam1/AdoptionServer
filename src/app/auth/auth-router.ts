import { Router } from "express";
import multer from "multer";
import path from "node:path";

import { constants } from "constants/constants";
import { registerValidate } from "./auth-middleware";
import { validationErrors } from "../../middleware";
import { registerController } from "./auth-controller";

const storagePhoto = multer.diskStorage({
  destination: constants.destinationUsers,
  filename: (_, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage: storagePhoto,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (extName) {
      return cb(null, true);
    }
    cb(new Error("Only images are allowed (jpeg|jpg|png|webp)"));
  },
});


const authRouter = Router();

authRouter.post(
  "/register",
  upload.single("photo"),
  registerValidate,
  validationErrors,
  registerController
);

export default authRouter;