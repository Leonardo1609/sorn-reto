import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveObservation, startGetObservations } from '../actions/observations';
import { setShowObservationActions } from '../actions/ui';
import { Modal } from '../components/Modal';
import { ObservationActions } from '../components/ObservationActions';
import { IObservation } from '../interfaces/interfaces';
import { IAuthStateSelector } from '../reducer/authReducer';
import { IObservationsStateSelector } from '../reducer/observationsReducer';
import { IUiStateSelector } from '../reducer/uiReducer';

export const Observations = () => {


    const dispatch = useDispatch();
    const observations = useSelector( ( state: IObservationsStateSelector ) => state.observations.observations );
    const activeObservation = useSelector( ( state: IObservationsStateSelector ) => state.observations.activeObservation );
    const showModal = useSelector( ( state: IUiStateSelector ) => state.ui.showModal );
    const showObservationActions = useSelector( ( state: IUiStateSelector ) => state.ui.showObservationActions );
    const user = useSelector( ( state: IAuthStateSelector ) => state.auth.user );

    useEffect( () => {
        dispatch( startGetObservations() );
    }, [ dispatch ])

    const openObservationActions = ( observation: IObservation ) => {
        dispatch( setActiveObservation( observation ) );
        if( activeObservation === observation && showObservationActions ){
            dispatch( setShowObservationActions( false ) );
        } else {
            dispatch( setShowObservationActions( true ) );
        }
    }

    const backgroundState = ( state: string ) => state === 'rechazado' ? 'bg-yellow-500' : state === 'aceptado' ? 'bg-green-500' : 'bg-blue-500' 

    const creatorRow = ( username: string ) => ( username === user?.username ) && 'font-bold';

    return (
        <div className="min-w-full flex justify-center bg-gray-200 m-h-100 relative">
            { ( showModal.bool && showModal.component ) && <Modal 
                component={ showModal.component }
            /> }
            <div className="w-full p-4 md:w-3/4 mt-60 md:mt-36">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Observaciones registradas</span>
                </div>
                <table className="table-auto w-full border border-blue-500 border-separate mt-10 text-sm sm:text-base">
                    <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">Descripcion</th>
                            <th className="text-center">VIN</th>
                            <th className="text-center hidden sm:table-cell">Estado</th>
                            <th className="text-center hidden sm:table-cell">Registrado por</th>
                            <th className="text-center hidden sm:table-cell">Actualizado por</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { observations.map( ( observation: IObservation ) => (
                            <tr 
                                key={ observation.id } 
                                className={ `${ backgroundState( observation.state ) } ${ creatorRow( observation.creator )}` }>
                                <td className="text-center py-3 border-t border-blue-500">{ observation.id }</td>
                                <td className="text-center py-3 border-t border-blue-500">{ observation.detail }</td>
                                <td className="text-center py-3 border-t border-blue-500">{ observation.vin }</td>
                                <td className="text-center py-3 border-t border-blue-500 hidden sm:table-cell">{ observation.state }</td>
                                <td className="text-center py-3 border-t border-blue-500 hidden sm:table-cell">{ observation.creator }</td>
                                <td className="text-center py-3 border-t border-blue-500 hidden sm:table-cell">{ observation.solver }</td>
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