import { Request, Response } from 'express';
import Vehicle from "../model/Vehicle";

// Create a new vehicle
export const createVehicle = async ( req: Request, res: Response ) => {

    try {
        const { vin } = req.body;
        const vehicleExists = await Vehicle.findOne({ 
            where: {
                vin
            }
        })

        if( vehicleExists ) return res.status( 400 ).json({ msg: 'El vehículo ya se encuentra en existencia' });

        const vehicle = await Vehicle.create({ vin });

        return res.json({ vehicle });

    } catch (error) {
        console.log( error );
        res.send( 500 ).json({ msg: "There was an error" });
    }
}

// Get all vehicles
export const getVehicles = async ( req: Request, res: Response ) => {
    try {
        const vehicles = await Vehicle.findAll();
        return res.json({ vehicles });

    } catch (error) {
        console.log( error );
        res.send( 500 ).json({ msg: "There was an error" });
    }
}