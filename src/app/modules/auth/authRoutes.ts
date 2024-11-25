import { Router } from "express"
import validateRequest from "../../middleware/validateRequest"
import { authValidation } from "./authValidation"
import { authController } from "./authController"

const route = Router()
route.post('/loginUser',
    validateRequest(authValidation.loginUserValidation),
    authController.logInUser
)


export const authRoutes = route;