import { IVehicle, IVehicleAction } from "../interfaces/interfaces"
import { types } from "../types/types"

export interface IVehiclesStateSelector {
    vehicles: IVehiclesState
}
interface IVehiclesState {
    vehicles: IVehicle[],
    activeVehicle: IVehicle | null
}

const initialState = {
    vehicles: [],
    activeVehicle: null
}

export const vehiclesReducer = (state = initialState, { type, payload }: IVehicleAction ): IVehiclesState => {
    switch (type) {

    case types.setVehicles:
        return { 
            ...state, 
            vehicles: payload.vehicles
        }

    case types.addVehicle:
        return {
            ...state,
            vehicles: [ payload.vehicle , ...state.vehicles ]
        }

    case types.activeVehicle:
        return {
            ...state,
            activeVehicle: payload.vehicle
        }

    default:
        return state
    }
}
