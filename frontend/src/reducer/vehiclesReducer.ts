import { IVehicle, IVehicleAction } from "../interfaces/interfaces"
import { types } from "../types/types"

const initialState = {
    vehicles: [],
    activeVehicle: null
}

export default (state = initialState, { type, payload }: IVehicleAction ) => {
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
