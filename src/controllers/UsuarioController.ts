import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Usuario } from "../entities/Usuario";

export class UsuarioController {
    async create(req: Request, res: Response): Promise<Response> {
        const usuarioRepository = AppDataSource.getRepository(Usuario);

        const usuario = usuarioRepository.create(req.body);

        const savedUsuario = await usuarioRepository.save(usuario);

        return res.status(201).json(savedUsuario);
    }
}