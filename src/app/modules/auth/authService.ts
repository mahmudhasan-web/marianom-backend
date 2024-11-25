import { StatusCodes } from "http-status-codes";
import { SECRETTOKEN } from "../../../secrets";
import ApiError from "../../utilis/ApiErr";
import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

const logInUserFromDB = async (payload: {
    userName: string;
    password: string;
  }) => {
    const user = await prisma.user.findUnique({
      where: {
        userName: payload.userName,
      },
    });
  
    if (!user) {
      throw new ApiError(StatusCodes.CONFLICT, "User doesn't exit");
    }
    const isCorrectPassword = compareSync(payload.password, user.password);
    if (!isCorrectPassword) {
      throw new ApiError(StatusCodes.FORBIDDEN, "invalid credential");
    }
  
    const { password, ...userWithoutPassword } = user;
  
    const token = jwt.sign(userWithoutPassword, SECRETTOKEN as string, {
      expiresIn: 36000,
    });
    const userName = user.userName;
    const email = user.email;
    const imageUrl = user.imageUrl;
  
    return { accessToken: token, data: { userName, email, imageUrl } };
  };


  export const authService = {logInUserFromDB}