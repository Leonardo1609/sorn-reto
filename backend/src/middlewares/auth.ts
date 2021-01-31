import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface IEncryption {
    userId: string 
}

export default ( req: any, res: Response, next: NextFunction ) => {

    const token = req.header('x-auth-token') as string;

    if( !token ) return res.status(401).send({ msg: 'Token not found' })

    try {
        const encryption = jwt.verify( token || '', process.env.KEY || 'secret' ) as IEncryption;
        req.userId = encryption.userId;
        next();
    } catch (error) {
        console.log( error );
        res.status( 401 ).json({ msg: 'Invalid Token' });
    }
}