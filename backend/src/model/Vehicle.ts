import { DataTypes } from "sequelize";
import { db } from "../config/db";

const Vehicle = db.define('Vehicle', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vin: {
        type: DataTypes.STRING,
        unique: true
    }
});

export default Vehicle;