import { Request, Response } from "express";
import { userService } from "./userService";
import sendResponse from "../../utilis/SendResponse";
import catchAsync from "../../utilis/catchAsync";
import { StatusCodes } from "http-status-codes";


const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createUserIntoDB(req.body)
    sendResponse(res, { statusCode: 201, success: true, message: "User created successfully", data: result })

})



export const userController = { createUser } 