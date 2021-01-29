import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetObservationsStatesPerUser } from '../actions/observations';
import { startGetUsers } from '../actions/users';
import { ObservationPerUsers } from '../components/ObservationPerUsers'

export const Home = () => {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( startGetUsers() );
        dispatch( startGetObservationsStatesPerUser() );
    }, [ dispatch ]);

    return (
        <div className="w-full flex justify-center bg-gray-200 m-h-100 relative">
            <div className="w-full flex flex-wrap p-4 md:w-3/4 mt-60 md:mt-36">
                <div className="flex-1 md:mr-5">
                    <ObservationPerUsers /> 
                </div>
                <div className="flex-1">
                </div>
            </div>
        </div>
    )
}
