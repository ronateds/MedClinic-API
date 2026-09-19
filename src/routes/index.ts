import { Router } from "express"
import authRoutes from "./auth.routes"
import { authMiddleware } from "../middlewares/authMiddleware"
import { asyncHandler } from "../middlewares/asyncHandler"
import { UsuarioController } from "../controllers/UsuarioController"

const routes = Router()

routes.use("/auth", authRoutes)

const usuarioController = new UsuarioController();

routes.get(
    "/users/me",
    authMiddleware,
    asyncHandler((req, res) => usuarioController.meuPerfil(req, res))
)

export { routes }