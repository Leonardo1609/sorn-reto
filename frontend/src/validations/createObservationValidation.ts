import { IObservationValues } from "../interfaces/interfaces";

export const createObservationValidation = ( { detail }: IObservationValues ) => {
    let errors = {};

    if( detail.length === 0 ){
        errors = {
            detail: 'El campo detalle es requerido'
        }
    }

    return errors;
}