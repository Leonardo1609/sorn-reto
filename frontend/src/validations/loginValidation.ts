import { ILoginvalues } from "../interfaces/interfaces";

export const loginValidation = ( { username, password }: ILoginvalues ) => {

    let errors = {};

    if( username.length === 0 ){
        errors = {
            ...errors,
            username: 'El campo nombre de usuario es requerido'
        };
    }

    if( password.length === 0 ){
        errors = {
            ...errors,
            password: 'El campo contraseña es requerido'
        };
    }

    return errors;

}