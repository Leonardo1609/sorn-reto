import { Router } from "express";
import { check } from "express-validator";
import { createVehicle, getVehicles } from "../controllers/vehiculeController";
import auth from "../middlewares/auth";

const router = Router();

export default () => {
    router.post('/',
        auth,
        [ check('vin', 'VIN field is required').notEmpty() ],
        createVehicle
    );

    router.get('/all',
        auth,
        getVehicles
    );

    return router;
}