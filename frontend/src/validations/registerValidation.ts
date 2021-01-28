import { IRegistValues } from "../interfaces/interfaces";

export const registerValidation = ( { username, password }: IRegistValues ) => {

    let errors = {};

    if( username.length === 0 ){
        errors = {
            ...errors,
            username: 'El campo nombre de usuario requiere entre 6-15 caracteres'
        };
    }

    if( password.length === 0 ){
        errors = {
            ...errors,
            password: 'El campo contraseña es require entre 6-15 caracteres'
        };
    }

    return errors;

}