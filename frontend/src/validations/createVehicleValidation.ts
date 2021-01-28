import { IVehicleValues } from "../interfaces/interfaces";

export const createVehicleValidation = ( { vin }: IVehicleValues ) => {
    let errors = {};

    if( vin.length === 0 ){
        errors = {
            vin: 'El campo VIN es requerido'
        }
    }

    return errors;
}