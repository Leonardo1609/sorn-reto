import { IAuthReducer } from "../interfaces/interfaces"
import { types } from "../types/types"

const initialState = {
    user: '',
    authenticated: false
}

export default (state = initialState, { type, payload }: IAuthReducer) => {
    switch (type) {
        case types.login:
        case types.createAccount:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                authenticated: true,
                token: payload.token
            }
        case types.setUser:
            return {
                ...state,
                user: payload.user,
                authenticated: true
            }
        case types.signOut:
            localStorage.removeItem('token');
            return {
                user: null,
                authenticated: false,
                token: ''
            }
        default:
            return state
    }
}
