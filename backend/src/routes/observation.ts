import { createObservation, updateStateOfVehicle } from "../controllers/observationController";
import { Router } from "express";
import { check } from "express-validator";
import auth from "../middlewares/auth";

const router = Router();

export default () => {
    router.post('/:vehicleId', auth, [
        check('detail', 'Detail field is required').notEmpty()
    ], createObservation );

    router.patch('/:observationId',
        auth,
        updateStateOfVehicle
    );
    
    return router;
}