import { IObservation, IObservationAction } from "../interfaces/interfaces"
import { types } from "../types/types"

const initialState = {
    observations: [],
    activeObservation: null
}

export default (state = initialState, { type, payload }: IObservationAction) => {
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
        case types.deleteObservation:
            return {
                ...state,
                observations: state.observations.filter( ( observation: IObservation ) => observation.id !== payload.idToDelete )
            }
        default:
            return state
        }
}
