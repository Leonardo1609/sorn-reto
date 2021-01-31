import { IAuthReducer, IUser } from "../interfaces/interfaces"
import { types } from "../types/types"

export interface IAuthStateSelector {
    auth: IAuthState
}
interface IAuthState {
    user: IUser | null,
    authenticated: boolean,
    token: string
}

const initialState: IAuthState = {
    user: null,
    authenticated: false,
    token: ''
}

export const authReducer = (state = initialState, { type, payload }: IAuthReducer): IAuthState => {
    switch (type) {
        case types.login:
        case types.createAccount:
            localStorage.setItem('token', payload.token )
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
