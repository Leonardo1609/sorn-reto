import { types } from "../types/types";

export const setShowModal = ( bool: boolean ) => ({
    type: types.showModal,
    payload: { showModal: bool }
})

