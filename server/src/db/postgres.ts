import { Sequelize } from 'sequelize';
import * as pg from 'pg';

const database = process.env.POSTGRES_DB || 'chatapp';
const host = process.env.POSTGRES_HOST || 'pg-svc.development.svc.cluster.local';
const password = process.env.POSTGRES_PASSWORD;
const username = process.env.POSTGRES_USER || 'postgres';
const port = parseInt(process.env.POSTGRES_PORT || '5432');

export default new Sequelize(
    database, 
    username, 
    password, 
    {
        host: host,
        port: port,
        dialect: 'postgres',
        dialectModule: pg
    }
);
