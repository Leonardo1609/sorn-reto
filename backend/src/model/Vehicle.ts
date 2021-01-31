import { DataTypes, Model } from "sequelize";
import { db } from "../config/db";

interface IVehicle extends Model {
    id: number,
    vin: string
}


const Vehicle = db.define<IVehicle>('Vehicle', {
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