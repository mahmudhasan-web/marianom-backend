import { z } from "zod";

const loginUserValidation = z.object({
    userName: z.string(), 
    password: z.string()
        
})

export const authValidation = {loginUserValidation}