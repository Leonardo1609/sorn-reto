import { createObservation, deleteObservation, getObservations, getObservationsStates, updateObservation, updateStateOfVehicle } from "../controllers/observationController";
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

    router.get('/observations',
        auth,
        getObservations 
    );

    router.get('/observation-states',
        auth,
        getObservationsStates
    );
    
    return router;
}