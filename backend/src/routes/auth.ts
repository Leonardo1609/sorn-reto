import { Router } from 'express';
import { check } from 'express-validator';
import { createUserByAdmin, registUser, signInUser, verifyUser } from '../controllers/authController';
import auth from '../middlewares/auth';
const router = Router();

// authController
export default () => {

    router.post('/', [
        check('username', 'Username field require between 6-15 characters').isLength({ min: 6, max: 15 }).trim().escape(),
        check('password', 'Password field require between 6-15 characters').isLength({ min: 6, max: 15 }).trim().escape(),
    ], registUser )

    router.get('/',
        auth,
        verifyUser
    );

    router.post('/signIn',[
        check('username', 'Username field is required').notEmpty(),
        check('password', 'Password field is required').notEmpty()
    ], signInUser);

    router.post('/create-by-admin', auth, [
        check('username', 'Username field is required').notEmpty(),
        check('password', 'Password field is required').notEmpty()
    ], createUserByAdmin);

    return router;
}

