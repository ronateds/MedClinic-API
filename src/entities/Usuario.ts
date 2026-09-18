import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UsuarioRole {
    ADMINISTRADOR = "ADMINISTRADOR",
    ATENDENTE = "ATENDENTE"
}

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Column('varchar')
    nome!: string;

    @Column('varchar', { unique: true })
    email!: string;

    @Column('varchar',{ length: 256 })
    senha!: string;

    @Column('varchar')
    role!: string;

    @CreateDateColumn()
    createdAt!: Date;
}