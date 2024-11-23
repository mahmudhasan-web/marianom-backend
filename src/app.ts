
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import router from './app/routes'
import { PORT } from './secrets'
import { PrismaClient } from '@prisma/client'
import GlobalErrorHandler from './app/middleware/globalError'
import cookieParser from 'cookie-parser'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
    ],
    credentials: true,
  }),
)

app.use('/api/v1', router)

app.use(GlobalErrorHandler)

const prisma = new PrismaClient()

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseConnection()



// application routes

app.get('/', async (req: Request, res: Response) => {
  res.send({message : 'Server is running properly'})
})


app.listen(PORT, () => {
  console.log('server is running')
})





export default app
