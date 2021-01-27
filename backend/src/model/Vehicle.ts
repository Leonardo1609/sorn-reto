import { DataTypes } from "sequelize";
import { db } from "../config/db";
import Observation from "./Observation";

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

Vehicle.hasMany( Observation );

export default Vehicle;