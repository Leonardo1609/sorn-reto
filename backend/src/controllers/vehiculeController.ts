import { Response } from 'express';
import User from '../model/User';
import Vehicle from "../model/Vehicle";

export const createVehicle = async ( req: any, res: Response ) => {
    const id = req.userId;

    const user = User.findByPk( id );

    if ( !user ) return res.send( 404 ).json({ msg: 'Unauthorized' });

    try {
        const { vin } = req.body;
        const vehicleExists = await Vehicle.findOne({ 
            where: {
                vin
            }
        })

        if( vehicleExists ) return res.status( 400 ).json({ msg: 'Vechicle already exists' });

        const vehicle = await Vehicle.create({ vin });

        return res.json({ vehicle });

    } catch (error) {
        console.log( error );
        res.send( 500 ).json({ msg: "There was an error" });
    }
}