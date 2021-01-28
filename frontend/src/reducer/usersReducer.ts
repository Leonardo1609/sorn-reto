import { IUserReducer } from "../interfaces/interfaces"
import { types } from "../types/types"

const initialState = {
    users: [] 
}

export default (state = initialState, { type, payload }: IUserReducer) => {
    switch (type) {

    case types.setUsers:
        return {
            users: payload.users
        }
    case types.addUser:
        return {
            users: [ payload.user, ...state.users ]
        }

    default:
        return state
    }
}
