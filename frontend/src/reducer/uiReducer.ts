import { IUi } from "../interfaces/interfaces"
import { types } from "../types/types"

const initialState = {
    showModal: {
        bool: false,
        component: null
    },
    showObservationActions: false

}

export default (state = initialState, { type, payload }: IUi) => {
    switch (type) {

    case types.showModal:
        return { 
            ...state, 
            showModal: payload.showModal
        }
    
    case types.showObservationActions:
        return {
            ...state,
            showObservationActions: payload.showObservationActions
        }
        
    default:
        return state
    }
}
