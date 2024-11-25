import { Router } from "express"
import { userRoutes } from "../modules/user/userRoute"
import { authRoutes } from "../modules/auth/authRoutes"



const router = Router()

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  }

  
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
/**
 * 
 * mvc
 */