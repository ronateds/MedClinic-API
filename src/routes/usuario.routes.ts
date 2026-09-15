import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

const usuarioRoutes = Router();

const usuarioController = new UsuarioController();

usuarioRoutes.post(
    '/usuarios',
    (req, res) => usuarioController.create(req, res)
);

export default usuarioRoutes;