import { Dispatch } from "redux"
import { clientAxios } from "../config/clientAxios"
import { IObservation, IObservationsStatesPerUser, IQuantityObervationPerState, IUser } from "../interfaces/interfaces";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { IUsersStateSelector } from "../reducer/usersReducer";
import { IVehiclesStateSelector } from "../reducer/vehiclesReducer";
import { IObservationsStateSelector } from "../reducer/observationsReducer";
import { IAuthStateSelector } from "../reducer/authReducer";

export const startGetObservations = () => {
    return async ( dispatch: Dispatch ) => {
        try {
            const { data } = await clientAxios.get('/observation/all');
            const observations: IObservation[] = []
            
            data.observations.forEach( ( observation: any ) => {
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
    return async ( dispatch: Dispatch, getState: () => IVehiclesStateSelector ) => {
        try {
            const vehicle = getState().vehicles.activeVehicle;
            const vehicleId = vehicle?.id;
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
    return async ( dispatch: Dispatch, getState: () => IObservationsStateSelector & IAuthStateSelector ) => {
        try {
            const activeObservation = getState().observations.activeObservation;
            const user = getState().auth.user;

            const observationId = activeObservation?.id;
            const username = user?.username;

            const { data } = await clientAxios.patch( `observation/solve/${ observationId }`, { idState } );

            username && dispatch( updateStateObservation( data.observation.id, data.observation.idState, username ) );

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
    return async ( dispatch: Dispatch, getState: () => IObservationsStateSelector ) => {
        try {
            const activeObservation = getState().observations.activeObservation;
            const observationId = activeObservation?.id;

            const { data } = await clientAxios.patch(`/observation/${ observationId }`, { detail });

            observationId && dispatch( modifyObservationDetail( observationId, data.observation.detail ) );

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
    return ( dispatch: Dispatch, getState: () => IObservationsStateSelector ) => {
        try {

            const activeObservation = getState().observations.activeObservation;
            const observationId = activeObservation?.id;

            Swal.fire({
              title: '¿Estás seguro?',
              text: "No podrás recuperar la observación una vez eliminada",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí, eliminar'
            }).then( async (result) => {
              if (result.isConfirmed) {
                await clientAxios.delete(`/observation/${ observationId }`);
                observationId && dispatch( deleteObservation( observationId ) );
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
    return async ( dispatch: Dispatch, getState: () => IUsersStateSelector ) => {

        try {
            const { data } = await clientAxios.get('/observation/observation-per-user');
            const { users } = getState().users;

            // console.log( data );

            const quantityPerState = ( data: any[], idState: number, userId: number ) => (
                data.find( ( item: any ) => item.createdBy === userId && item.idState === idState )?.observationQuantity || 0
            ) 

            const observationsPerUser: IObservationsStatesPerUser[] = users.map( ( user: IUser ) => ({
                    username: user.username,
                    registered: quantityPerState( data.observations, 1, user.id ),
                    accepted: quantityPerState( data.observations, 2, user.id ),
                    rejected: quantityPerState( data.observations, 3, user.id ),
            }) );

            dispatch( setObservationsStatesPerUser( observationsPerUser ) );

        } catch (error) {
            console.log( error );
        }  
    }
}

export const startGetQuantityObservationPerState = () => {
    return async( dispatch: Dispatch ) => {
        try {
            const { data } = await clientAxios.get('/observation/observation-states');
            dispatch( setQObservationPerState( data.quantityPerState ) );
        } catch (error) {
            console.log( error.response );
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

export const setObservationsStatesPerUser = ( observationsQuantity: IObservationsStatesPerUser[] ) => ({
    type: types.observationsStatesPerUser,
    payload: { observationStatesPerUser : observationsQuantity }
})

export const setQObservationPerState = ( observationsPerState: IQuantityObervationPerState[] ) => ({
    type: types.qObservationsPerState,
    payload: { quantityObservationPerState: observationsPerState }
    
})