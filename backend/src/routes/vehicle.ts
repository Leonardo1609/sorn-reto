import { Router } from "express";
import { check } from "express-validator";
import { createVehicle } from "../controllers/vehiculeController";
import auth from "../middlewares/auth";

const router = Router();

export default () => {
    router.post('/',
        auth,
        [ check('vin', 'VIN field is required').notEmpty() ],
        createVehicle
    );

    return router;
}