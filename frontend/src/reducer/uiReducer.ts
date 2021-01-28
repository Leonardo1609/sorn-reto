import { IUi } from "../interfaces/interfaces"
import { types } from "../types/types"

const initialState = {
    showModal: false
}

export default (state = initialState, { type, payload }: IUi) => {
    switch (type) {

    case types.showModal:
        return { 
            ...state, 
            showModal: payload.showModal
        }
        
    default:
        return state
    }
}
