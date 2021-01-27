import { 
    createObservation, 
    deleteObservation, 
    getObservations, 
    updateObservation, 
    updateStateOfVehicle, 
    getCountObservationPerState, 
    getQuantityObservationsPerUsersAndState 
} from "../controllers/observationController";

import { Router } from "express";
import { check } from "express-validator";
import auth from "../middlewares/auth";

const router = Router();

export default () => {
    router.post('/:vehicleId', auth, [
        check('detail', 'Detail field is required').notEmpty()
    ], createObservation );

    router.patch('/solve/:observationId',
        auth,
        updateStateOfVehicle
    );

    router.patch('/:observationId',
        auth,
        updateObservation
    );

    router.delete('/:observationId',
        auth,
        deleteObservation 
    );

    router.get('/all',
        auth,
        getObservations 
    );

    router.get('/observation-states',
        auth,
        getCountObservationPerState
    );

    router.get('/observation-per-user',
        auth,
        getQuantityObservationsPerUsersAndState
    )
    
    return router;
}