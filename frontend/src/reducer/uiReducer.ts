import { ElementType } from "react"
import { IUi } from "../interfaces/interfaces"
import { types } from "../types/types"

export interface IUiStateSelector {
    ui: IUiState
}
interface IUiState {
    showModal: {
        bool: boolean,
        component: ElementType | null,
    },
    showObservationActions: boolean,
    loadingUser: boolean
}

const initialState: IUiState = {
    showModal: {
        bool: false,
        component: null
    },
    showObservationActions: false,
    loadingUser: false

}

export const uiReducer = (state = initialState, { type, payload }: IUi): IUiState => {
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
    case types.loadingUser:
        return{
            ...state,
            loadingUser: payload.loadingUser
        }
        
    default:
        return state
    }
}
