import { IUserAction } from "../interfaces/interfaces"
import { types } from "../types/types"
import { IUser } from '../interfaces/interfaces';

export interface IUsersStateSelector {
    users: IUsersState
}
export interface IUsersState  {
    users: IUser[]
}
const initialState: IUsersState = {
    users: [],
}

export const usersReducer = (state = initialState, { type, payload }: IUserAction ): IUsersState => {
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
