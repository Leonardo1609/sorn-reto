import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetObservationsStatesPerUser, startGetQuantityObservationPerState } from '../actions/observations';
import { startGetUsers } from '../actions/users';
import { ChartObservationsPerState } from '../components/ChartObservationsPerState';
import { ObservationPerUsers } from '../components/ObservationPerUsers'

export const Home = () => {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( startGetUsers() );
        dispatch( startGetObservationsStatesPerUser() );
        dispatch( startGetQuantityObservationPerState() );
    }, [ dispatch ]);

    return (
        <div className="w-full flex justify-center bg-gray-200 m-h-100 relative">
            <div className="w-full flex flex-wrap p-4 md:w-3/4 mt-60 md:mt-36 md:justify-around space-y-10 lg:space-y-0">
                <div className="w-full lg:w-2/5">
                    <ObservationPerUsers /> 
                </div>
                <div className="w-full lg:w-2/5">
                    <ChartObservationsPerState />
                </div>
            </div>
        </div>
    )
}
