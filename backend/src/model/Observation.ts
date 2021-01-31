import { DataTypes, Model } from "sequelize";
import { db } from "../config/db";
import State from "./State";
import User from "./User";
import Vehicle from "./Vehicle";

interface IVehicle extends Model {
    id?: number,
    detail: string,
    vehicleId: number,
    idState: number,
    solvedBy?: number,
    createdBy: number 
}

const Observation = db.define<IVehicle>('Observation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    detail: DataTypes.STRING,
    vehicleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Vehicle,
            key: 'id'
        }
    },
    idState: {
        type: DataTypes.INTEGER,
        references: {
            model: State,
            key: 'id'
        }
    },
    solvedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

Observation.belongsTo( User, { as: 'creator', foreignKey: 'createdBy', onDelete: 'CASCADE' } );
Observation.belongsTo( User, { as: 'solver', foreignKey: 'solvedBy', onDelete: 'CASCADE' } );
Observation.belongsTo( Vehicle, { as: 'vehicle', foreignKey: 'vehicleId', onDelete: 'CASCADE' } );
Observation.belongsTo( State, { as: 'state', foreignKey: 'idState', onDelete: 'CASCADE' } );

export default Observation;