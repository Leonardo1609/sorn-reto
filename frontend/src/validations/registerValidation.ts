import { IRegistValues } from "../interfaces/interfaces";

export const registerValidation = ( { username, password }: IRegistValues ) => {

    let errors = {};

    if( username.length < 6 || username.length > 45 ){
        errors = {
            ...errors,
            username: 'El campo nombre de usuario requiere entre 6-45 caracteres'
        };
    }

    if( password.length < 6 || password.length > 45 ){
        errors = {
            ...errors,
            password: 'El campo contraseña es require entre 6-45 caracteres'
        };
    }

    return errors;

}