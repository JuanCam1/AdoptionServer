import type { Request, Response } from "express";
import { matchedData } from "express-validator";

import { prisma } from "../../lib";
import { sendErrorResponse, sendSuccesResponse, validateErrorCatch, formatterCapitalize, hashPassword, errorMessage } from "../../utils";
import type { User } from "@prisma/client";
import { constants } from "constants/constants";


export const registerService = async (req: Request, res: Response) => {
  try {
    const data: Omit<User, "id" | "avatarUrl"> = matchedData(req);
    console.log(data);
    const { name, email, password, telephone, bio, id_status } = data;

    const isDuplicateEmail = await isExistEmail(email);

    if (isDuplicateEmail) {
      sendErrorResponse(res, 404, errorMessage.ALREADY_EXIST);
    }

    const nameCapitalize = formatterCapitalize(name);

    const hashedPassword = await hashPassword(password);
    const photo = req?.file?.filename ?? constants.sinPhoto;
    console.log(photo);

    const dataUser: Omit<User, "id"> = {
      name: nameCapitalize,
      email,
      password: hashedPassword,
      avatarUrl: photo,
      bio: bio,
      telephone,
      id_status: Number(id_status),
    };

    await prisma.user.create({
      data: dataUser,
    });

    sendSuccesResponse(res, 202, "created");
  } catch (error) {
    validateErrorCatch(res, error);
  }
}


async function isExistEmail(email: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const exist = !!user;

    return exist;
  } catch (error) {
    throw new Error("Error en la búsqueda del usuario");
  }
}