import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Usuario, UsuarioRole } from "../entities/Usuario";
import { CreateUsuarioDto } from "../dtos/CreateUsuarioDto";
import { AppError } from "../errors/AppError";
import bcrypt from "bcryptjs"

const usuarioRepository = AppDataSource.getRepository(Usuario);
export class UsuarioController {
    async create(req: Request, res: Response): Promise<Response> {
        const { nome, email, senha, role }: CreateUsuarioDto = req.body;

        const emailExite = await usuarioRepository.findOneBy({email});
        if(emailExite) throw new AppError("Email já cadastrado", 400);

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = usuarioRepository.create({
            nome,
            email,
            senha: senhaHash,
            role: role === "ADMINISTRADOR" ? UsuarioRole.ADMINISTRADOR : UsuarioRole.ATENDENTE
        });
        const savedUsuario = await usuarioRepository.save(usuario);

        return res.status(201).json({
            id: savedUsuario.id,
            nome: savedUsuario.nome,
            email: savedUsuario.email,
            role: savedUsuario.role
        });
    }
}