import { Dispatch } from "redux";
import { clientAxios } from "../config/clientAxios";
import { tokenAuth } from "../config/tokenAuth";
import { types } from "../types/types";

export const getUser = () => {
    return async ( dispatch: Dispatch ) => {
        const token = localStorage.getItem('token');

        if ( token ) {
            tokenAuth( token );
        }

        try {
            const { data } = await clientAxios.get('/auth');
            dispatch( setUser( data.user.username ) );
        } catch (error) {
            console.log( error.response );
        }
    }
}

export const startCreateAccount = ( username: string, password: string ) => {
    return async ( dispatch: Dispatch ) => {
        try {
            const { data } = await clientAxios.post('/auth', { username, password });
            dispatch( createAccount( data ) );

            getUser();

        } catch (error) {
            console.log( error.response );
        }
    }
}

export const startLoginUser = ( username: string, password: string ) => {
    return async ( dispatch: Dispatch ) => {
        try {
            const { data } = await clientAxios.post('/auth/signin', { username, password });
            dispatch( loginUser( data ) );

            getUser();

        } catch (error) {
            console.log( error.response );
        }
    }
}

export const createAccount = ( token: string ) => ({
    type: types.createAccount,
    payload: token
})

export const loginUser = ( token: string ) => ({
    type: types.login,
    payload: token
})

export const setUser = ( username: string ) => ({
    type: types.setUser,
    payload: username
})
