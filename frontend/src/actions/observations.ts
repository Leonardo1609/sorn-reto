import { Dispatch } from "redux"
import { clientAxios } from "../config/clientAxios"
import { IObservation } from "../interfaces/interfaces";
import { types } from "../types/types";

export const startGetObservations = () => {
    return async ( dispatch: Dispatch ) => {
        try {
            const { data } = await clientAxios.get('/observation/all');
            const observations: IObservation[] = []
            data.observations.map( ( observation: any ) => {
                const item: IObservation = {
                    id: observation.id,
                    creator: observation.creator.username,
                    detail: observation.detail,
                    state: observation.state.name,
                    solver: observation.solver?.username || null,
                    vin: observation.vehicle.vin
                }

                observations.push( item );
            })
            dispatch( setObservations( observations ) );
        } catch (error) {
            console.log( error.response );
        }
    }
}

export const startCreateObservation = ( detail: string ) => {
    return async ( dispatch: Dispatch, getState: any ) => {
        try {
            const vehicleId = getState().vehicles.activeVehicle.id;
            await clientAxios.post(`/observation/${ vehicleId }`, { detail });
        } catch (error) {
            console.log( error.response );
        }
    }
}

export const startSolveObservation = ( idState: number ) => {
    return async ( dispatch: Dispatch, getState: any ) => {
        try {
            const { id: observationId } = getState().observations.activeObservation;
            const { username } = getState().auth.user;
            const { data } = await clientAxios.patch( `observation/solve/${ observationId }`, { idState } );
            dispatch( updateStateObservation( data.observation.id, data.observation.idState, username ) )
        } catch (error) {
            console.log( error.response );
        }
    }
}

export const startDeleteObservation = () => {
    return async ( dispatch: Dispatch, getState: any ) => {
        try {
            const { id: observationId } = getState().observations.activeObservation;
            const { data } = await clientAxios.delete(`/observation/${ observationId }`);

            console.log( data );

            dispatch( deleteObservation( observationId ) );

        } catch (error) {
            console.log( error.response );
        }
    }
}

export const setObservations = ( observations: IObservation[] ) => ({
    type: types.setObservations,
    payload: { observations }
});

export const setActiveObservation = ( observation: IObservation ) => ({
    type: types.activeObservation,
    payload: { observation }
});

export const updateStateObservation = ( id: number, idState: number, solver: string ) => ({
    type: types.updateStateObservation,
    payload: { observationToSolve: { 
        id, 
        state: idState === 2 ? 'aceptado' : 'rechazado',
        solver 
    } }
});

export const deleteObservation = ( idToDelete: number ) => ({
    type: types.deleteObservation,
    payload: { idToDelete }
})