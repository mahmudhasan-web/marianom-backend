import { Request, Response } from "express";
import { userService } from "./userService";
import sendResponse from "../../utilis/SendResponse";
import catchAsync from "../../utilis/catchAsync";
import { StatusCodes } from "http-status-codes";


const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createUserIntoDB(req.body)
    sendResponse(res, { statusCode: 201, success: true, message: "User created successfully", data: result })

})

const logInUser = catchAsync(async (req: Request, res: Response) => {
    const result = await
        userService.logInUserFromDB(req.body)

        res.cookie('accessToken', result.accessToken,
            {
                httpOnly: true,
                secure : true,
                sameSite : "none"
            }
        )

    sendResponse(res, { statusCode: StatusCodes.ACCEPTED, success: true, message: "User logged in successfully", data: result })



})


export const userController = { createUser, logInUser } 