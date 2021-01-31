import { DataTypes, Model } from "sequelize";
import { db } from "../config/db";

export interface IState extends Model {
    id: number,
    name: string
}

const State = db.define<IState>('State', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    }
});

export default State;
