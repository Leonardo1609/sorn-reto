import { IObservation, IObservationAction, IObservationsStatesPerUser, IQuantityObervationPerState } from "../interfaces/interfaces"
import { types } from "../types/types"

export interface IObservationsStateSelector {
    observations: IObservationsState
}
export interface IObservationsState {
    observations: IObservation[],
    activeObservation: IObservation | null,
    wantEditDetail: boolean,
    observationsStatesPerUser: IObservationsStatesPerUser[],
    quantityObservationsPerState: IQuantityObervationPerState[]
}

const initialState: IObservationsState = {
    observations: [],
    activeObservation: null,
    wantEditDetail: false,
    observationsStatesPerUser: [],
    quantityObservationsPerState: []
}

export const observationsReducer = (state = initialState, { type, payload }: IObservationAction): IObservationsState => {
    switch (type) {

        case types.setObservations:
            return { 
                ...state, 
                observations: payload.observations
            }
        case types.addObservation:
            return {
                ...state,
                observations: [ payload.observation, ...state.observations ]
            }
        case types.activeObservation:
            return {
                ...state,
                activeObservation: payload.observation
            }
        case types.updateStateObservation:
            return {
                ...state,
                observations: state.observations.map( ( observation: IObservation ) => {
                    if ( observation.id === payload.observationToSolve.id ){
                        observation.state = payload.observationToSolve.state;
                        observation.solver = payload.observationToSolve.solver;
                        return observation;
                    } else{
                        return observation;
                    }
                })
            }
        case types.wantEditDetail:
            return{
                ...state,
                wantEditDetail: payload.wantEditDetail
            }
        case types.modifyObservationDetail:
            return {
                ...state,
                observations: state.observations.map( ( observation: IObservation ) => {
                    if( observation.id === payload.observationToModify.id ){
                        observation.detail = payload.observationToModify.detail;
                        return observation;
                    } else {
                        return observation;
                    }
                })
            }
        case types.observationsStatesPerUser:
            return {
                ...state,
                observationsStatesPerUser: payload.observationStatesPerUser
            }
        case types.qObservationsPerState:
            return {
                ...state,
                quantityObservationsPerState: payload.quantityObservationPerState
            }
        case types.deleteObservation:
            return {
                ...state,
                observations: state.observations.filter( ( observation: IObservation ) => observation.id !== payload.idToDelete )
            }
        default:
            return state
        }
}
