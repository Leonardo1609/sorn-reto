import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { closeSession } from "../actions/auth"
import { Button } from "./Button"

export const Header = () => {
    const dispatch = useDispatch();

    return (
        <header className="w-full bg-blue-500 flex flex-col md:flex-row justify-between py-5 px-16 lg:px-32 items-center space-y-4 sm:space-y-8 md:space-y-0 fixed z-10">
            <h1 className="text-2xl sm:text-3xl text-white font-bold text-center"><Link to="/">Página Principal</Link></h1>
            <nav className="flex items-center">
                <ul className="flex sm:space-x-10 flex-col items-center sm:flex-row text-white font-bold ">
                    <li className="hover:text-gray-200"><Link to="/users">Usuarios</Link></li>
                    <li className="hover:text-gray-200"><Link to="/vehicles">Vehículos</Link></li>
                    <li className="hover:text-gray-200"><Link to="/observations">Observaciones</Link></li>
                </ul>
            </nav>
            <Button
                className="bg-red-500 rounded transition duration-300 px-3 py-2 text-white font-bold hover:bg-red-700"
                value="Cerrar Sesión"
                type="button"
                fn={ dispatch.bind( this, closeSession() ) }
            />
        </header>
    )
}
