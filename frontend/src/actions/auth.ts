import { Dispatch } from "redux";
import { clientAxios } from "../config/clientAxios";
import { tokenAuth } from "../config/tokenAuth";
import { IUser } from "../interfaces/interfaces";
import { types } from "../types/types";
import { setLoadingUser } from "./ui";
import Swal from 'sweetalert2';

export const getUser = () => {
    return async ( dispatch: Dispatch ) => {
        try {
            dispatch( setLoadingUser( true ) );
            const token = localStorage.getItem('token');

            if ( token ) {
                tokenAuth( token );
            }

            const { data } = await clientAxios.get('/auth');
            dispatch( setUser( data.user ) );
            dispatch( setLoadingUser( false ) );
        } catch (error) {
            console.log( error.response );
            dispatch( setLoadingUser( false ) );
        }
    }
}

export const startCreateAccount = ( username: string, password: string ) => {
    return async ( dispatch: Dispatch ) => {
        try {
            const { data } = await clientAxios.post('/auth', { username, password });
            dispatch( createAccount( data.token ) );
            getUser();

        } catch (error) {
            console.log( error.response );
            Swal.fire(
                'Error',
                error.response.data.msg,
                'error'
            ) 
        }
    }
}

export const startLoginUser = ( username: string, password: string ) => {
    return async ( dispatch: Dispatch ) => {
        try {
            const { data } = await clientAxios.post('/auth/signin', { username, password });

            dispatch( loginUser( data.token ) );
            getUser();

        } catch (error) {
            console.log( error.response );
            Swal.fire(
                'Error',
                error.response.data.msg,
                'error'
            ) 
        }
    }
}

export const createAccount = ( token: string ) => ({
    type: types.createAccount,
    payload: { token }
})

export const loginUser = ( token: string ) => ({  
    type: types.login,
    payload: { token }
})

export const setUser = ( user: IUser ) => ({
    type: types.setUser,
    payload: { user }
})

export const closeSession = () => ({
    type: types.signOut
});
