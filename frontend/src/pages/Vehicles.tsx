import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal } from '../actions/ui';
import { setActiveVehicle, startGetVehicles } from '../actions/vehicles';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { ObservationForm } from '../components/ObservationForm';
import { VehicleForm } from '../components/VehicleForm';
import { IVehicle } from '../interfaces/interfaces';
import { IUiStateSelector } from '../reducer/uiReducer';
import { IVehiclesStateSelector } from '../reducer/vehiclesReducer';

export const Vehicles = () => {

    const dispatch = useDispatch();
    const vehicles = useSelector( ( state: IVehiclesStateSelector ) => state.vehicles.vehicles );
    const showModal = useSelector( ( state: IUiStateSelector ) => state.ui.showModal );

    useEffect( () => {
        dispatch( startGetVehicles() );
    }, [ dispatch ])

    const openObservationModal = ( vehicle: IVehicle ) => {
        dispatch( setActiveVehicle( vehicle ) )
        dispatch( setShowModal( true, ObservationForm ) );
    }

    return (
        <div className="w-full flex justify-center bg-gray-200 m-h-100 relative">
            { ( showModal.bool && showModal.component ) && <Modal 
                component={ showModal.component } 
            /> }
            <div className="w-full p-4 md:w-2/4 mt-60 md:mt-36">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Vehículos registrados</span>
                    <Button 
                        className="bg-blue-500 p-3 text-white font-bold uppercase rounded" 
                        type="button"
                        value="+ Nuevo"
                        fn={ dispatch.bind( this, setShowModal( true, VehicleForm ) ) }
                    />
                </div>
                <table className="table-auto w-full border border-blue-500 border-separate mt-10">
                    <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">VIN</th>
                            <th className="text-center">Observaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { vehicles.map( ( vehicle: IVehicle ) => (
                            <tr key={ vehicle.id }>
                                <td className="text-center py-3 border-t border-blue-500">{ vehicle.id }</td>
                                <td className="text-center py-3 border-t border-blue-500">{ vehicle.vin }</td>
                                <td className="text-center py-3 border-t border-blue-500">
                                    <Button 
                                        className="bg-blue-500 p-2 text-white font-bold uppercase rounded text-sm" 
                                        type="button"
                                        value="+ Agregar"
                                        fn={ openObservationModal.bind( this, vehicle ) }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
