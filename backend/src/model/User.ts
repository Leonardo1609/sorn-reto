import { DataTypes, Model, Optional } from "sequelize";
import { db } from '../config/db';

interface IUser extends Model {
    id?: number,
    username: string,
    password: string,
    role?: string
}


const User = db.define<IUser>('User', {
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

