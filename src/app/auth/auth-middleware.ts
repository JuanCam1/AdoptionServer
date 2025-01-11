import { check } from "express-validator";

export const registerValidate = [
  check("name").isLength({ min: 2, max: 70 }).withMessage("Must be between 2 and 70 characters"),
  check("email").isEmail().withMessage("Email no valid"),
  check("password").isLength({ min: 4, max: 30 }).withMessage("Must be between 4 and 30 characters"),
  check("bio").isLength({ min: 2, max: 5000 }).withMessage("Must be between 2 and 60 characters"),
  check("telephone").isLength({ min: 4, max: 30 }).withMessage("Must be between 4 and 30 characters"),
  check("id_status").exists().withMessage("Id status no valid"),
];