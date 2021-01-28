import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { startCreateAccount } from "../actions/auth"
import { Button } from "../components/Button"
import { useForm } from "../hooks/useForm"
import { IRegistValues } from "../interfaces/interfaces"
import { registerValidation } from "../validations/registerValidation"

export const Register = () => {

    const initialValues: IRegistValues = {
        username: '',
        password: ''
    }

    const dispatch = useDispatch();

    const { formValues, handleChange, handleSubmit, errors } = useForm( initialValues, registerValidation, registerSubmit )

    const { username, password } = formValues as IRegistValues;

    function registerSubmit () {
        dispatch( startCreateAccount( username, password ));
    }

    return (
        <div className="bg-blue-500 h-screen flex items-center">
            <form 
                className="md:w-1/2 bg-gray-200 mx-auto p-10"
                onSubmit={ handleSubmit }
                noValidate
            >
                <h1 className="text-5xl font-bold text-blue-500 text-center">Registrarse</h1>
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
                    value="Registrarte"
                    className="w-full bg-blue-400 text-white p-3 rounded font-bold uppercase mt-8 hover:bg-blue-500 transition duration-300"
                />   
                <Link 
                    to="/auth/login"
                    className="text-center text-blue-500 w-full block mt-8 cursor-pointer transition duration-300
                             hover:text-blue-600 hover:font-bold"
                >¿Ya tienes una cuenta? Ingresa aquí</Link>
            </form>
        </div>
    )
}