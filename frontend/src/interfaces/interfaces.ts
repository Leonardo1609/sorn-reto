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
