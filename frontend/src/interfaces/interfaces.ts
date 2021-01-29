import { ElementType } from "react";

export interface ILoginvalues {
    username: string,
    password: string
}

export interface IRegistValues extends ILoginvalues {}

export interface IAuthReducer {
    type: string,
    payload: {
        user: IUser,
        authenticated: boolean,
        token: string
    }
}

export interface IUser {
    id: number,
    username: string,
    role: string | null
}

export interface IUserAction {
    type: string,
    payload: {
        users: IUser[],
        user: IUser
    }
}

export interface IVehicle {
    id: string,
    vin: string
}
export interface IVehicleAction {
    type: string,
    payload: {
        vehicles: IVehicle[],
        vehicle: IVehicle
    }
}

export interface IVehicleValues {
    vin: string
}

export interface IObservationValues {
    detail: string
}

export interface IObservation extends IObservationValues {
    id: number,
    vin: string,
    state: string,
    creator: string,
    solver: string | null
}

export interface IObservationAction {
    type: string,
    payload: {
        observations: IObservation[],
        observation: IObservation,
        observationToSolve: {
            id: number,
            state: string,
            solver: string
        },
        idToDelete: number,
        wantEditDetail: boolean,
        observationToModify: {
            id: number,
            detail: string
        },
        quantityObservationPerState: {
            idState: number,
            count: number
        }[]
    }
}
export interface IUi {
    type: string,
    payload: {
        showModal: {
            bool: boolean,
            component: ElementType | null
        },
        showObservationActions: boolean,
        loadingUser: boolean
    },
}
