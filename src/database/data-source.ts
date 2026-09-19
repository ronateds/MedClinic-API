import 'reflect-metadata'
import { DataSource } from 'typeorm'
import 'dotenv/config'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? 'db_medclinic',
    synchronize: true,
    logging: true,
    logger: 'advanced-console',
    entities: ['src/entities/*.ts'],
})