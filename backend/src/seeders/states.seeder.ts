import State, { IState } from "../model/State";

export default async () => {
    try {
        const states = [ 'registrado', 'aceptado', 'rechazado' ];

        let statePromises: Promise<IState>[] = [];

        const statesExists = await State.findAll();

        if( statesExists.length > 0 ) return;

        states.forEach( ( name: string, i: number ) => {
            statePromises.push(State.create({ id: ( i + 1 ), name }));
        })

        await Promise.all( statePromises );

    } catch (error) {
        console.log( error );
    }
}