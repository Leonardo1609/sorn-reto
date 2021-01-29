import { Dispatch } from "redux"
import { clientAxios } from "../config/clientAxios"
import { IUser } from "../interfaces/interfaces";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const startGetUsers = () => {
    return async ( dispatch: Dispatch ) => {
        try {
            const { data } = await clientAxios.get('/auth/all');
            dispatch( setUsers( data ) );
        } catch (error) {
            console.log( error.response );
        }
    }
}

export const startCreateUser = ( username: string, password: string ) => {
    return async ( dispatch: Dispatch ) => {
        try {
            const { data } = await clientAxios.post('/auth/create-by-admin', { username, password } );
            dispatch( addUser( data.user ) )
            Swal.fire(
              'Usuario creado',
              'El usuario fue creado con éxito',
              'success'
            )
        } catch (error) {
            Swal.fire(
              'Error',
              error.response.data.msg,
              'error'
            )
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