import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { db } from '../config/db';

// Import models to create the tables
import '../model/User';
import '../model/Vehicle';
import '../model/State';
import '../model/Observation';

// seeders
import adminSeeder from '../seeders/admin.seeder';
import statesSeeder from '../seeders/states.seeder';

import authRouter from '../routes/auth';
import vehicleRouter from '../routes/vehicle';
import observationRouter from '../routes/observation';

class Server {
    private app;
    private port: number;
    private db;

    constructor(){
        this.app = express();
        this.port = Number(process.env.PORT) || 4000;
        this.db = db;
    }

    connection(){
        ( async () => {
            try {
                await this.db.sync();
                console.log('Connected to mysql');
                this.seeders();
            } catch (error) {
                console.log( error ) ;
            }
        })();
    }

    seeders(){
        adminSeeder();
        statesSeeder();
    }

    middlewares(){
        this.app.use( cors() )
        this.app.use( morgan('dev') );
        this.app.use( express.json());
        this.app.use( express.urlencoded({ extended: false }));


        // routes
        this.app.use( '/api/auth', authRouter() );
        this.app.use( '/api/vehicle', vehicleRouter() );
        this.app.use( '/api/observation', observationRouter() );
    }

    execute(){
        this.middlewares();
        this.connection();
        this.app.listen( this.port, () => {
            console.log(`Connected to port: ${ this.port }`);
        })
    }
}

export default Server;