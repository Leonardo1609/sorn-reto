import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal } from '../actions/ui';
import { startGetUsers } from '../actions/users';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { NewUserForm } from '../components/NewUserForm';
import { IUser } from '../interfaces/interfaces';

export const Users = () => {

    const dispatch = useDispatch();
    const { users } = useSelector( ( state: any ) => state.users );
    const { showModal } = useSelector( ( state: any ) => state.ui );

    useEffect( () => {
        dispatch( startGetUsers() );
    }, [ dispatch ])

    return (
        <div className="w-full flex justify-center bg-gray-200 h-100 relative">
            { showModal && <Modal 
                component={ NewUserForm } 
            /> }
            <div className="w-full p-4 md:w-2/4 mt-56 md:mt-36">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Usuarios registrados</span>
                    <Button 
                        className="bg-blue-500 p-3 text-white font-bold uppercase rounded" 
                        type="button"
                        value="+ Nuevo"
                        fn={ dispatch.bind( this, setShowModal( true ) ) }
                    />
                </div>
                <table className="table-auto w-full border border-blue-500 border-separate mt-10">
                    <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map( ( user: IUser ) => (
                            <tr key={ user.id }>
                                <td className="text-center border-t border-blue-500">{ user.id }</td>
                                <td className="text-center border-t border-blue-500">{ user.username }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
