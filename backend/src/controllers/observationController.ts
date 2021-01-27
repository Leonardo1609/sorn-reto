import { Response } from 'express';
import State from '../model/State';
import Observation from "../model/Observation";

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

        observation.idState = idState;
        observation.solvedBy = userId;

        await observation.save();

        return res.json({ observation });

    } catch (error) {
        console.log( error );
        res.send( 500 ).json({ msg: "There was an error" });        
    }
}
