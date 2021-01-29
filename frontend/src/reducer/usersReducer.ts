import { IUserAction } from "../interfaces/interfaces"
import { types } from "../types/types"

const initialState = {
    users: [],
}

export default (state = initialState, { type, payload }: IUserAction ) => {
    switch (type) {

    case types.setUsers:
        return {
            ...state,
            users: payload.users
        }
    case types.addUser:
        return {
            ...state,
            users: [ payload.user, ...state.users ]
        }
    default:
        return state
    }
}
