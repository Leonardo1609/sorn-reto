import { Dispatch } from "redux"
import { clientAxios } from "../config/clientAxios"
import { IObservation } from "../interfaces/interfaces";
import { types } from "../types/types";
import Swal from "sweetalert2";

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
            Swal.fire(
              'Error',
              error.response.data.msg,
              'success'
            )
        }
    }
}

export const startCreateObservation = ( detail: string ) => {
    return async ( dispatch: Dispatch, getState: any ) => {
        try {
            const vehicleId = getState().vehicles.activeVehicle.id;
            await clientAxios.post(`/observation/${ vehicleId }`, { detail });
            Swal.fire(
              'Observación agregada',
              'La observación se agregó con éxito',
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

export const startSolveObservation = ( idState: number ) => {
    return async ( dispatch: Dispatch, getState: any ) => {
        try {
            const { id: observationId } = getState().observations.activeObservation;
            const { username } = getState().auth.user;
            const { data } = await clientAxios.patch( `observation/solve/${ observationId }`, { idState } );
            dispatch( updateStateObservation( data.observation.id, data.observation.idState, username ) )
            Swal.fire(
              'Observación actualizada',
              'La observación se actualizó con éxito',
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

export const startModifyObservationDetail = ( detail: string ) => {
    return async ( dispatch: Dispatch, getState: any ) => {
        try {
            const { id: observationId } = getState().observations.activeObservation;
            const { data } = await clientAxios.patch(`/observation/${ observationId }`, { detail });
            dispatch( modifyObservationDetail( observationId, data.observation.detail ) );
            Swal.fire(
              'Observación editada',
              'La observación se editó con éxito',
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

export const startDeleteObservation = () => {
    return async ( dispatch: Dispatch, getState: any ) => {
        try {
            const { id: observationId } = getState().observations.activeObservation;
            await clientAxios.delete(`/observation/${ observationId }`);

            Swal.fire({
              title: '¿Estás seguro?',
              text: "No podrás recuperar la observación una vez eliminada",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí, eliminar'
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch( deleteObservation( observationId ) );
                Swal.fire(
                  'Observación eliminada',
                  'La observación se eliminó con éxito',
                  'success'
                )
              }
            })

        } catch (error) {
            Swal.fire(
              'Error',
              error.response.data.msg,
              'error'
            )
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

export const startGetObservationsStatesPerUser = () => {
    return async ( dispatch: Dispatch ) => {
        try {
            const { data } = await clientAxios.get('/observation/observation-per-user');
            let observationsPerUser = [];
            data.observations.map( ( info: any ) => {
                // TODO
            } )
            dispatch( setObservationsStatesPerUser( data.observations ) );
        } catch (error) {
            console.log( error );
        }  
    }
}

export const deleteObservation = ( idToDelete: number ) => ({
    type: types.deleteObservation,
    payload: { idToDelete }
})

export const setWantEditDetail = ( bool: boolean ) => ({
    type: types.wantEditDetail,
    payload: { wantEditDetail: bool }
})

export const modifyObservationDetail = ( id: number, detail: string ) => ({
    type: types.modifyObservationDetail,
    payload: { observationToModify: { id, detail } }
});

export const setObservationsStatesPerUser = ( observationsQuantity: [] ) => ({
    type: types.setObservationsStatesPerUser,
    payload: observationsQuantity 
})