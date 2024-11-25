import { PrismaClient, User } from "@prisma/client";
import { compareSync, hashSync } from "bcryptjs";
import ApiError from "../../utilis/ApiErr";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { SECRETTOKEN } from "../../../secrets";

const prisma = new PrismaClient();

const createUserIntoDB = async (payload: User) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
      userName: payload.userName,
    },
  });

  if (user) {
    throw new ApiError(StatusCodes.CONFLICT, "User already exit");
  }

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashSync(payload.password, 10),
    },
  });

  return result;
};



export const userService = { createUserIntoDB };
