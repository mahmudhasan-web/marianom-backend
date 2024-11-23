import dotenv from 'dotenv'

dotenv.config({path : '.env'})

export const PORT = process.env.PORT
export const SECRETTOKEN  = process.env.toke_generate as string