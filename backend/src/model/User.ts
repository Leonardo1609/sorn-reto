import { DataTypes } from "sequelize";
import { db } from '../config/db';

const User = db.define('User', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
})

export default User;

