import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Usuario, UsuarioRole } from "../entities/Usuario";
import { CreateUsuarioDto } from "../dtos/CreateUsuarioDto";
import { AppError } from "../errors/AppError";
import bcrypt from "bcryptjs"
import { gerarToken } from "../utils/jwt";

const usuarioRepository = AppDataSource.getRepository(Usuario);
export class UsuarioController {
    async create(req: Request, res: Response): Promise<Response> {
        const { nome, email, senha, role }: CreateUsuarioDto = req.body;

        const emailExite = await usuarioRepository.findOneBy({ email });
        if (emailExite) throw new AppError("Email já cadastrado", 400);

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

    async login(req: Request, res: Response): Promise<Response> {
        const { email, senha } = req.body

        if (!email || !senha) {
            throw new AppError("email, senha são obrigatórios.", 400)
        }

        const usuario = await usuarioRepository.findOneBy({ email })
        if (!usuario) throw new AppError("Credenciais Inválidas", 401)

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if (!senhaCorreta) throw new AppError("Credenciais Inválidas", 401)

        const token = gerarToken({ sub: usuario.id.toString(), role: usuario.role as UsuarioRole })

        return res.json({
            token,
            id: usuario.id
        })
    }

    async meuPerfil(req: Request, res: Response): Promise<Response> {
        const usuario = await usuarioRepository.findOne({
            where: { id: Number(req.usuario?.sub) }
        })

        if (!usuario) throw new AppError("usuario não encontrado", 404)

        return res.json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            role: usuario.role
        })
    }

    async adminPing(req: Request, res: Response): Promise<Response> {
        return res.json({ message: "ok, admin" })
    }
}