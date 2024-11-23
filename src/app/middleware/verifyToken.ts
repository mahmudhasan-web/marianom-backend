import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { SECRETTOKEN } from '../../secrets'
import ApiError from '../utilis/ApiErr'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../utilis/catchAsync'


interface AuthenticatedRequest extends Request {
    user?: JwtPayload | string
}

const VerifyToken = catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const token = await req?.cookies?.token
        if (!token) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorize for this")

        }
        jwt.verify(token, SECRETTOKEN as string, async (err: jwt.VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
            if (err) {
                throw new ApiError(StatusCodes.CONFLICT, "Unauthorize user")
            }
            else {
                req.user = decoded
                next()
            }
        })

    }
)

export default VerifyToken