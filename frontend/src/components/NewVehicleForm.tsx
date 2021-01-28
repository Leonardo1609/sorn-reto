import React from "react";
import { useDispatch } from "react-redux";
import { setShowModal } from "../actions/ui";
import { startCreateVehicle } from "../actions/vehicles";
import { useForm } from "../hooks/useForm";
import { IVehicleValues } from "../interfaces/interfaces";
import { createVehicleValidation } from "../validations/createVehicleValidation";
import { Button } from "./Button";

export const NewVehicleForm = () => {
    const initialValues: IVehicleValues = {
        vin: '',
    }

    const dispatch = useDispatch();

    const { formValues, handleChange, handleSubmit, errors, reset } = useForm( initialValues, createVehicleValidation, registerSubmit )

    const { vin } = formValues as IVehicleValues;

    function registerSubmit () {
        dispatch( startCreateVehicle( vin ) );
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
            <h2 className="text-center text-2xl font-bold">Crear Vehículo</h2>
            <div className="mt-8">
                <label 
                    className="block w-full mb-3"
                    htmlFor="vin"
                >VIN: </label>
                <input 
                    className="w-full p-3 rounded"
                    type="text"
                    id="vin"
                    name="vin"
                    onChange={ handleChange }
                    value={ vin }
                />
                <span className="text-sm font-bold text-red-500">{ errors['vin'] }</span>
            </div>
            <Button
                type="submit" 
                value="Guardar"
                className="w-full bg-blue-400 text-white p-3 rounded font-bold uppercase mt-8 hover:bg-blue-500 transition duration-300"
            />   
        </form>
    )
}
