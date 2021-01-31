import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();

const database: string = process.env.DATABASE || 'sorndb';
const username: string = process.env.USERDB || 'root';
const password: string = process.env.PASSWORDB || 'root';
const host    : string = process.env.HOST || 'localhost';

export const db = new Sequelize( database, username, password, {
    host,
    dialect: 'mysql',
    
    define: {
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    } 
});

