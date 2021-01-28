import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveObservation, startGetObservations } from '../actions/observations';
import { setShowObservationActions } from '../actions/ui';
import { ObservationActions } from '../components/ObservationActions';
import { IObservation } from '../interfaces/interfaces';

export const Observations = () => {


    const dispatch = useDispatch();
    const { observations } = useSelector( ( state: any ) => state.observations );
    const { activeObservation } = useSelector( ( state: any ) => state.observations );
    const { showObservationActions } = useSelector( ( state: any ) => state.ui )

    useEffect( () => {
        dispatch( startGetObservations() );
    }, [ dispatch ])

    const openObservationActions = ( observation: IObservation ) => {
        dispatch( setActiveObservation( observation ) );
        dispatch( setShowObservationActions( !showObservationActions ) );
    }

    return (
        <div className="w-full flex justify-center bg-gray-200 m-h-100 relative">
            <div className="w-full p-4 md:w-3/4 mt-60 md:mt-36">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Observaciones registradas</span>
                </div>
                <table className="table-auto w-full border border-blue-500 border-separate mt-10">
                    <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">Descripcion</th>
                            <th className="text-center">VIN</th>
                            <th className="text-center">Estado</th>
                            <th className="text-center">Registrado por</th>
                            <th className="text-center">Actualizado por</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { observations.map( ( observation: IObservation ) => (
                            <tr 
                                key={ observation.id } 
                                className={ observation.state === 'rechazado' ? 'bg-yellow-200' : observation.state === 'aceptado' ? 'bg-green-200' : 'bg-blue-200' }>
                                <td className="text-center py-3 border-t border-blue-500">{ observation.id }</td>
                                <td className="text-center py-3 border-t border-blue-500">{ observation.detail }</td>
                                <td className="text-center py-3 border-t border-blue-500">{ observation.vin }</td>
                                <td className="text-center py-3 border-t border-blue-500">{ observation.state }</td>
                                <td className="text-center py-3 border-t border-blue-500">{ observation.creator }</td>
                                <td className="text-center py-3 border-t border-blue-500">{ observation.solver }</td>
                                <td className="text-center py-3 border-t border-blue-500 relative">
                                    <FontAwesomeIcon 
                                        className="cursor-pointer"
                                        onClick={ openObservationActions.bind( this, observation ) }
                                        icon={ faBars } 
                                    />
                                { ( showObservationActions && activeObservation === observation ) && <ObservationActions /> }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}