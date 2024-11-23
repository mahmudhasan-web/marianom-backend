import { PrismaClient, User } from "@prisma/client";
import { compareSync, hashSync } from "bcryptjs";
import ApiError from "../../utilis/ApiErr";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../../../config";

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

const logInUserFromDB = async (payload: {
  userName: string;
  password: string;
}) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      userName: payload.userName,
    },
  });

  if (!userInfo) {
    throw new ApiError(404, "User not found");
  }

  const isCorrectPassword = compareSync(payload.password, userInfo.password);
  if (!isCorrectPassword) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Password doesn't match");
  }

  const { password, ...user } = userInfo;
  const token = jwt.sign(user, config.jwt.secret_key as string, {
    expiresIn: 36000,
  });

  return {
    accessToken: token,
    user,
  };
};

export const userService = { createUserIntoDB, logInUserFromDB };
