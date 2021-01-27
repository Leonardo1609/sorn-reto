import { DataTypes } from "sequelize";
import { db } from "../config/db";

const State = db.define('State', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    }
});

export default State;
