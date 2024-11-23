import { PrismaClient, User } from "@prisma/client";
import { compareSync, hashSync } from "bcryptjs";
import { Request, Response } from "express";
import ApiError from "../../utilis/ApiErr";
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { SECRETTOKEN } from "../../../secrets";


const prisma = new PrismaClient()

const createUserIntoDB = async (payload: User) => {
    const { email, password, name, userName, dateOfBirth, gender, interestIn, number } = payload
    const user = await prisma.user.findUnique({
        where: {
            email: email,
            userName: userName
        }
    })

    if (user) {
        throw new ApiError(StatusCodes.CONFLICT, "User already exit")
    }

    const result = await prisma.user.create({
        data: {
            email: email,
            password: hashSync(password, 10),
            name: name,
            userName: userName,
            dateOfBirth: dateOfBirth,
            gender: gender,
            interestIn: interestIn,
            number: number

        }
    })

    return result

}

const logInUserFromDB = async (payload: { userName: string, password: string }) => {

    const user = await prisma.user.findUnique({
        where: {
            userName: payload.userName
        }
    })

    if (user) {
        const isCorrectPassword = compareSync(payload.password, user.password)
        if (isCorrectPassword) {
            const { password, ...userWithoutPassword } = user;

            const token = jwt.sign(userWithoutPassword, SECRETTOKEN as string, { expiresIn: 36000 })
            const userName = user.userName
            const email = user.email
            const imageUrl = user.imageUrl



            return { accessToken: token, data: { userName, email, imageUrl } }

        }

        throw new ApiError(StatusCodes.FORBIDDEN, "Password doesn't match")
    }
    else {
        throw new ApiError(StatusCodes.CONFLICT, "User doesn't exit")
    }
}


export const userService = { createUserIntoDB, logInUserFromDB }