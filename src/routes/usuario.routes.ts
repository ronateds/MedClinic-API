import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { asyncHandler } from "../middlewares/asyncHandler";

const usuarioRoutes = Router();

const usuarioController = new UsuarioController();

usuarioRoutes.post(
    '/usuarios',
    asyncHandler((req, res) => usuarioController.create(req, res))
);

export default usuarioRoutes;