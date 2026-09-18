import { Request, Response, NextFunction } from "express"
import { UsuarioRole } from "../entities/Usuario"
import { AppError } from "../errors/AppError"

export function roleMiddleware(...rolesPermitidas: UsuarioRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.usuario) {
            throw new AppError("Não autenticado", 401);
        }

        if (!rolesPermitidas.includes(req.usuario.role)) {
            throw new AppError("Você não tem permissão para acessar este recurso", 403);
        }

        return next()
    }
}
