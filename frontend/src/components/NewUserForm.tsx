import React from 'react'
import { useDispatch } from 'react-redux';
import { setShowModal } from '../actions/ui';
import { startCreateUser } from '../actions/users';
import { useForm } from '../hooks/useForm';
import { IRegistValues } from '../interfaces/interfaces';
import { registerValidation } from '../validations/registerValidation';
import { Button } from './Button'

export const NewUserForm = () => {
    const initialValues: IRegistValues = {
        username: '',
        password: ''
    }

    const dispatch = useDispatch();

    const { formValues, handleChange, handleSubmit, errors, reset } = useForm( initialValues, registerValidation, registerSubmit )

    const { username, password } = formValues as IRegistValues;

    function registerSubmit () {
        dispatch( startCreateUser( username, password ) ); 
        dispatch( setShowModal( false, null ) );
        reset( initialValues );
    }
    
    return (
        <form 
            onSubmit={ handleSubmit }
            className="bg-gray-200 w-full md:w-2/4 p-8"
            noValidate
        >
            <div className="mb-5">
                <span 
                    onClick={ dispatch.bind( this, setShowModal( false, null ) ) } 
                    className="float-right text-xl cursor-pointer font-bold text-gray-700"
                >x</span>
            </div>
            <h2 className="text-center text-2xl font-bold">Crear Usuario</h2>
            <div className="mt-8">
                <label 
                    className="block w-full mb-3"
                    htmlFor="username"
                >Nombre de usuario: </label>
                <input 
                    className="w-full p-3 rounded"
                    type="text"
                    id="username"
                    name="username"
                    onChange={ handleChange }
                    value={ username }
                />
                <span className="text-sm font-bold text-red-500">{ errors['username'] }</span>
            </div>
            <div className="mt-8">
                <label 
                    className="block w-full mb-3"
                    htmlFor="password"
                >Contraseña: </label>
                <input 
                    className="w-full p-3 rounded"
                    type="password"
                    id="password"
                    name="password"
                    onChange={ handleChange }
                    value={ password }
                />
                <span className="text-sm font-bold text-red-500">{ errors['password'] }</span>
            </div>
            <Button
                type="submit" 
                value="Crear"
                className="w-full bg-blue-400 text-white p-3 rounded font-bold uppercase mt-8 hover:bg-blue-500 transition duration-300"
            />   
        </form>
    )
}
