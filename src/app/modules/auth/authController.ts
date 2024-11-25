import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/SendResponse";
import { authService } from "./authService";
import { Request, Response } from "express";

const logInUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.logInUserFromDB(req.body);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const authController = { logInUser };
