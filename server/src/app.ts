import Server from './server';
import dotenv from 'dotenv';
import sequelize from './db/postgres';
import { dbInit } from './db/init';

import { config } from './config/config';
const PORT = config.port;

dotenv.config();
console.log(process.env);
const main = async () => {
    try {
        await sequelize.authenticate();
        await dbInit();
        console.log('Database connected');
        const server = new Server(PORT || 5000);
        server.run();
    } catch (error) {
        console.error(error);
    }
};
main();