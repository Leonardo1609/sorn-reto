import { Dispatch } from "redux"
import { clientAxios } from "../config/clientAxios"
import { IVehicle } from "../interfaces/interfaces";
import { types } from "../types/types";

export const startGetVehicles = () => {
    return async ( dispatch: Dispatch ) => {
        try {
            const { data } = await clientAxios.get('/vehicle/all');
            dispatch( setVehicles( data.vehicles ) );
        } catch ( error ) {
            console.log( error.response )
        }
    }
}

export const startCreateVehicle = ( vin: string ) => {
    return async ( dispatch: Dispatch ) => {
        try {
            const { data } = await clientAxios.post('/vehicle', { vin });
            dispatch( addVehicle( data.vehicle ) );
        } catch ( error ) {
            console.log( error.response );
        }
    }
}

export const setVehicles = ( vehicles: IVehicle[] ) => ({
    type: types.setVehicles,
    payload: { vehicles }
})

export const addVehicle = ( vehicle: IVehicle ) => ({
    type: types.addVehicle,
    payload: { vehicle }
})

export const setActiveVehicle = ( vehicle: IVehicle ) => ({
    type: types.activeVehicle,
    payload: { vehicle }
})