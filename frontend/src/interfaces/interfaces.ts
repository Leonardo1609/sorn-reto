export interface ILoginvalues {
    username: string,
    password: string
}

export interface IRegistValues extends ILoginvalues {}

export interface IAuthReducer {
    type: string,
    payload: {
        username: string,
        authenticated: boolean,
        token: string
    }
}

export interface IUser {
    id: string,
    username: string
}

export interface IUserReducer {
    type: string,
    payload: {
        users: IUser[],
        user: IUser
    }
}

export interface IUi {
    type: string,
    payload: {
        showModal: boolean
    }
}