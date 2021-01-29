import { Response, Request } from "express";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import User from "../model/User";
import jwt from 'jsonwebtoken';

// An user regist himself
export const registUser = async ( req: Request, res: Response ) => {

    const errors = validationResult( req );

    if ( !errors.isEmpty() ) return res.status( 400 ).json({ errors: errors.array() });

    try{
        const { username, password } = req.body;

        const userExists = await User.findOne({ 
            where: { username }
        });

        if ( userExists ) {
            res.status( 301 ).json({ msg: 'El usuario ya se encuentra en existencia' });
        }
    
        const salt = await bcrypt.genSalt( 10 );
        const hashedPass = bcrypt.hashSync( password, salt );
        const user = await User.create({ username, password: hashedPass });

        const payload = {
            userId: user.get('id')
        }
        const key = process.env.KEY || 'secret';

        jwt.sign( payload, key, { expiresIn: '1h' },
            ( error, token ) => {
                if( error ) throw error;
                res.send({ token });
            }
        )
        
    } catch( error ) {
        console.log( error );
        res.status(500).send({ msg: 'Hubo un error' });
    }
}

// Verify user after the auth middleware ( route/auth.ts : 16 )
export const verifyUser = async ( req: any, res: Response ) => {

    const id = req.userId;

    try {
        const user: any = await User.findByPk( id );
        res.json({ user: { username: user.username, id: user.id, role: user.role  } });
    } catch (error) {
        console.log( error );
        res.status(500).send({ msg: 'Hubo un error' });
    }
}

// Login user
export const signInUser = async ( req: Request, res: Response ) => {
    const errors = validationResult( req );

    if ( !errors.isEmpty() ) return res.status( 400 ).json({ errors: errors.array() });

    try {
        const { username, password } = req.body;

        const user: any = await User.findOne({ 
            where: {
                username
            }
        })

        if( !user ) return res.status( 404 ).json({ msg: 'Credenciales inválidas' });

        const passVerified = await bcrypt.compareSync( password, user.get('password') );


        if ( !passVerified ) return res.status( 401 ).json({ msg: 'Credenciales inválidas' });

        const payload = {
            userId: user.get('id')
        };

        jwt.sign( payload, process.env.KEY || 'secret', { expiresIn: '1h' }, 
            ( error, token ) => {
                if( error ) throw error;
                res.json({ token });
            }
        )

    } catch (error) {
        console.log( error );
        res.status(500).send({ msg: 'Hubo un error' });
    }
}

// Create user by admin
export const createUserByAdmin = async ( req: any, res: Response ) => {

    const id = req.userId;

    const user: any = await User.findByPk( id );

    if( user.role !== 'admin' ) return res.status( 403 ).json({ msg: 'No autorizado' })

    const errors = validationResult( req );
    if ( !errors.isEmpty() ) return res.status( 400 ).json({ errors: errors.array() });

    try {
        const { username, password } = req.body;

        const userExists = await User.findOne({
            where: {
                username
            }
        })

        if ( userExists ) return res.status( 400 ).json({ msg: 'El usuario ya se encuentra en existencia' });
        
        const salt = await bcrypt.genSalt( 10 );
        const hashedPass = await bcrypt.hashSync( password, salt );

        const user: any = await User.create({ username, password: hashedPass });

        res.json({ user: { username: user.username, id: user.id } });

    } catch (error) {
        console.log( error );
        res.status(500).send({ msg: 'Hubo un error' });
    }
}

// Get all users
export const getUsers = async ( req: Request, res: Response ) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'username']})    

        res.json({ users });
    } catch (error) {
        console.log( error );
        res.status(500).send({ msg: 'Hubo un error' });
    }
}