import { Response } from 'express';
import State from '../model/State';
import Observation from "../model/Observation";
import User from '../model/User';
import Vehicle from '../model/Vehicle';

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
        }] });
        res.json({ observations });

    } catch (error) {
        console.log( error );
        res.send( 500 ).json({ msg: "There was an error" });        
    }
}

export const getObservationsStates = async ( req: any, res: Response ) => {
    try {
        const states: any = await State.findAll({ attributes: ['id'] });

        const observationPromises: any[] = [];

        states.forEach( ( { id }: any ) => {
            observationPromises.push( Observation.findAndCountAll({ where: { idState: id }}) );
        } )

        const observations = await Promise.all( observationPromises );

        res.json({ observations });
        
    } catch (error) {
        console.log( error );
        res.send( 500 ).json({ msg: "There was an error" });        
    }

}