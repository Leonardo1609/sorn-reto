import { ElementType } from "react";
import { types } from "../types/types";

export const setShowModal = ( bool: boolean, component: ElementType | null ) => ({
    type: types.showModal,
    payload: { showModal: { bool, component } }
})

export const setShowObservationActions = ( bool: boolean ) => ({
    type: types.showObservationActions,
    payload: { showObservationActions: bool } 
})

export const setLoadingUser = ( bool: boolean ) => ({
    type: types.loadingUser,
    payload: { loadingUser: bool }
})


