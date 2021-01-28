import React from "react"
import { Link } from "react-router-dom"
import { Button } from "./Button"

export const Header = () => {
    return (
        <header className="w-full bg-blue-500">
            <h1><Link to="/">Página Principal</Link></h1>
            <nav>
                <ul>
                    <li><Link to="/">Usuarios</Link></li>
                    <li><Link to="/">Vehículos</Link></li>
                    <li><Link to="/">Observaciones</Link></li>
                </ul>
            </nav>
            <Button
                className="bg-red-500"
                value="Cerrar Sesión"
                type="button"
            />
        </header>
    )
}
