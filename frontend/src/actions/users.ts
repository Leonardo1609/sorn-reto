import { Dispatch } from "redux"
import { clientAxios } from "../config/clientAxios"
import { IUser } from "../interfaces/interfaces";
import { types } from "../types/types";

export const startGetUsers = () => {
    return async ( dispatch: Dispatch ) => {
        try {
            const { data } = await clientAxios.get('/auth/all');
            dispatch( setUsers( data ) );
        } catch (error) {
            console.log( error.response ) ;
        }
    }
}

export const startCreateUser = ( username: string, password: string ) => {
    return async ( dispatch: Dispatch ) => {
        try {
            const { data } = await clientAxios.post('/auth/create-by-admin', { username, password } );
            console.log( data.user );
            dispatch( addUser( data.user ) )
        } catch (error) {
            console.log( error.response ) ;
        }
    }
}

export const setUsers = ( users: IUser[] ) => ({
    type: types.setUsers,
    payload: users
})

export const addUser = ( user: IUser ) => ({
    type: types.addUser,
    payload: { user }
})