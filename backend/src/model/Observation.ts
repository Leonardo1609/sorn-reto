import { DataTypes } from "sequelize";
import { db } from "../config/db";
import State from "./State";
import User from "./User";

const Observation = db.define('Observation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    detail: DataTypes.STRING,
    vehicleId: DataTypes.INTEGER,
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

Observation.belongsTo( User, { as: 'Creator', foreignKey: 'createdBy', onDelete: 'CASCADE' } );
Observation.belongsTo( User, { as: 'Solver', foreignKey: 'solvedBy', onDelete: 'CASCADE' } );

export default Observation;