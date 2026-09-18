import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { validateDto } from "../middlewares/validate";
import { CreateUsuarioDto } from "../dtos/CreateUsuarioDto";
import { LoginDto } from "../dtos/LoginDto";

const authRoutes = Router();

const usuarioController = new UsuarioController();

authRoutes.post(
    '/register',
    validateDto(CreateUsuarioDto),
    asyncHandler((req, res) => usuarioController.create(req, res))
);

authRoutes.post(
    '/login',
    validateDto(LoginDto),
    asyncHandler((req, res) => usuarioController.login(req, res))
);

export default authRoutes;