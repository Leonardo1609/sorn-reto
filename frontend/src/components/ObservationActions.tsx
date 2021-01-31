import { useDispatch, useSelector } from 'react-redux'
import { setWantEditDetail, startDeleteObservation, startSolveObservation } from '../actions/observations'
import { setShowModal, setShowObservationActions } from '../actions/ui'
import { IAuthStateSelector } from '../reducer/authReducer'
import { IObservationsStateSelector } from '../reducer/observationsReducer'
import { ObservationForm } from './ObservationForm'

export const ObservationActions = () => {
    const user = useSelector( ( state: IAuthStateSelector ) => state.auth.user )
    const activeObservation = useSelector( ( state: IObservationsStateSelector ) => state.observations.activeObservation )
    const dispatch = useDispatch();

    const solveObservation = ( idState: number ) => {
        dispatch( setShowObservationActions( false ) );
        dispatch( startSolveObservation( idState ));
    }

    const removeObservation = () => {
        dispatch( setShowObservationActions( false ) );
        dispatch( startDeleteObservation() );
    }

    const showModalToModifyDetail = ( bool: boolean ) => {
        dispatch( setWantEditDetail( bool ) );
        dispatch( setShowObservationActions( false ));
        dispatch( setShowModal( true, ObservationForm ));
    }


    return (
        <ul className="w-28 absolute top-10 right-10 z-10 cursor-pointer">
            {
                // El creador puede editar y eliminar su observación, pero no puede aceptar y rechazar su propia observación, lo tiene que hacer otro usuario
                (  user?.username === activeObservation?.creator )
                ?
                <>
                    <li 
                        onClick={ showModalToModifyDetail.bind( this, true ) }   
                        className="text-white py-2 font-bold bg-blue-500"
                    >Editar</li>
                    <li 
                        onClick={ removeObservation }
                        className="text-white py-2 font-bold bg-red-500"
                    >Eliminar</li>
                </>
                :
                <>
                    <li 
                        onClick={ solveObservation.bind( this, 2 ) }
                        className="text-white py-2 font-bold bg-green-700"
                    >Aceptar</li>
                    <li 
                        onClick={ solveObservation.bind( this, 3 ) }
                        className="text-white py-2 font-bold bg-yellow-400"
                    >Rechazar</li>
                </>
            }
        </ul>
    )
}
