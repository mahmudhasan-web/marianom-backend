import { Router } from "express";
import { userController } from "./useController";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "./userValidation";

const route = Router()

route.post('/createUser',
    validateRequest(userValidation.CreateUserValidation),
    userController.createUser
)

route.post('/loginUser',
    validateRequest(userValidation.loginUserValidation),
    userController.logInUser
)


export const userRoutes = route