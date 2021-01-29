import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWantEditDetail, startCreateObservation, startModifyObservationDetail } from "../actions/observations";
import { setShowModal } from "../actions/ui";
import { useForm } from "../hooks/useForm";
import { IObservationValues } from "../interfaces/interfaces";
import { createObservationValidation } from "../validations/createObservationValidation";
import { Button } from "./Button";

export const ObservationForm = () => {
    const initialValues: IObservationValues = {
        detail: '',
    }

    const dispatch = useDispatch(),
          { wantEditDetail } = useSelector( ( state: any ) => state.observations );
    const { activeObservation } = useSelector( ( state: any ) => state.observations );

    const valuesToForm = wantEditDetail ? { detail: activeObservation.detail } : initialValues;

    const { formValues, handleChange, handleSubmit, errors, reset } = useForm( valuesToForm, createObservationValidation, registerSubmit ),
          { detail } = formValues as IObservationValues;

    function registerSubmit () {
        if( !wantEditDetail ){
            dispatch( startCreateObservation( detail ) );
        } else {
            dispatch( startModifyObservationDetail( detail ) );
        }
        dispatch( setShowModal( false, null ) );
        dispatch( setWantEditDetail( false ));
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
            <h2 className="text-center text-2xl font-bold">{ !wantEditDetail ? 'Agregar Observación' : 'Editar Observación' }</h2>
            <div className="mt-8">
                <label 
                    className="block w-full mb-3"
                    htmlFor="detail"
                >Detalle: </label>
                <input 
                    className="w-full p-3 rounded"
                    type="detail"
                    id="detail"
                    name="detail"
                    onChange={ handleChange }
                    value={ detail }
                />
                <span className="text-sm font-bold text-red-500">{ errors['detail'] }</span>
            </div>
            <Button
                type="submit" 
                value="Guardar"
                className="w-full bg-blue-400 text-white p-3 rounded font-bold uppercase mt-8 hover:bg-blue-500 transition duration-300"
            />   
        </form>
    )
}