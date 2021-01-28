import { Response } from 'express';
import State from '../model/State';
import Observation from "../model/Observation";
import User from '../model/User';
import Vehicle from '../model/Vehicle';
import { Sequelize } from 'sequelize';

// Create new observation
export const createObservation = async ( req: any, res: Response ) => {
    try {
        const createdBy = req.userId;
        const { detail } = req.body;
        const { vehicleId } = req.params;

        const observation = await Observation.create({ detail, vehicleId, createdBy, idState: 1 })

        res.json({ observation });

    } catch (error) {
        console.log( error );
        res.send( 500 ).json({ msg: "There was an error" });        
    }
}

// Update (solve) the state of observation ( just the owner of the observation can't do this )
export const updateStateOfVehicle = async ( req: any, res: Response ) => {
    try {
        const userId = req.userId;
        const observationId = req.params.observationId;

        const { idState } = req.body;

        const stateExists = await State.findByPk( idState );
        const observation: any = await Observation.findByPk( observationId );

        if( !observation ) return res.status( 404 ).json({ msg: "Observation not found" });

        if( observation.createdBy === userId ) return res.status( 403 ).json({ msg: "You can't change the state of your own observation" });

        if( !stateExists ) return res.status( 400 ).json({ msg: "State not found" });

        observation.idState = Number(idState);
        observation.solvedBy = userId;

        await observation.save();

        return res.json({ observation });

    } catch (error) {
        console.log( error );
        res.send( 500 ).json({ msg: "There was an error" });        
    }
}


// Modify detail of observation ( just the owner of the observation can do this )
export const updateObservation = async ( req: any, res: Response ) => {
    try {
        const userId = req.userId;
        const observationId = req.params.observationId;
        const { detail } = req.body;
        
        const observation: any = await Observation.findByPk( observationId );

        if( !observation ) return res.status( 404 ).json({ msg: "Observation not found" });
        
        if( observation.createdBy !== userId ) return res.status( 403 ).json({ msg: "Unauthorized. You just can edit your own observations" });

        if( observation.solvedBy ) return res.status( 400 ).json({ msg: "You can't modify already solved observations" });

        observation.detail = detail;

        await observation.save();

        return res.json({ observation });

    } catch (error) {
        console.log( error );
        res.send( 500 ).json({ msg: "There was an error" });        
    }
}

export const deleteObservation = async ( req: any, res: Response ) => {
    try {
        const userId = req.userId;
        const observationId = req.params.observationId;

        const observation: any = await Observation.findByPk( observationId );

        if( !observation ) return res.status( 404 ).json({ msg: "Observation not found" });

        if( observation.createdBy !== userId ) return res.status( 403 ).json({ msg: "Unauthorized. You just can delete your own observations" });

        await observation.destroy();

        return res.json({ msg: "Observation was deleted" });

    } catch (error) {
        console.log( error );
        res.send( 500 ).json({ msg: "There was an error" });        
    }
}

export const getObservations = async ( req: any, res: Response ) => {
    try {
        const observations = await Observation.findAll({ include: [{ 
            model: User, 
            attributes: [ 'username' ],
            as: 'solver',
        }, {
            model: User,
            attributes: [ 'username' ],
            as: 'creator'
        }, {
            model: Vehicle,
            attributes: [ 'vin' ],
            as: 'vehicle'
        }, {
            model: State,
            attributes: ['name'],
            as: 'state'
        }] });

        res.json({ observations });

    } catch (error) {
        console.log( error );
        res.send( 500 ).json({ msg: "There was an error" });        
    }
}

export const getCountObservationPerState = async ( req: any, res: Response ) => {
    try {
        const { count }: any = await Observation.findAndCountAll({ 
            attributes: [ 'idState' ], 
            group: ['idState']
        });

        res.json({ quantityPerState: count });
        
    } catch (error) {
        console.log( error );
        res.send( 500 ).json({ msg: "There was an error" });        
    }
}

export const getQuantityObservationsPerUsersAndState = async ( req: any, res: Response ) => {
    try {
        const observations = await Observation.findAll({ 
            include: [
                { 
                    model: User,
                    as: 'creator',
                    required: true,
                    attributes: [ 'username' ]
                }
            ],
            attributes: [ 'idState', [ Sequelize.fn( 'COUNT', Sequelize.col('creator.id') ), 'observationQuantity' ], 'createdBy' ],
            group: [ 'createdBy', 'idState', 'creator.username' ]
        });

        res.json({ observations });
        
    } catch (error) {
        console.log( error );
        res.send( 500 ).json({ msg: "There was an error" });        
    }
}