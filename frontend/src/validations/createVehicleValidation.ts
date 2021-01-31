import { IVehicleValues } from "../interfaces/interfaces";

export const createVehicleValidation = ( { vin }: IVehicleValues ) => {
    let errors = {};

    if( vin.length === 0 ){
        errors = {
            vin: 'El campo VIN es requerido'
        }
    }
    
    if( vin.length > 45 ){
        errors = {
            vin: 'El campo VIN no debe superar los 45 carácteres'
        }
    }

    return errors;
}