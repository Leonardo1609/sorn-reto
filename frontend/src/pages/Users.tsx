import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal } from '../actions/ui';
import { startGetUsers } from '../actions/users';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { UserForm } from '../components/UserForm';
import { IUser } from '../interfaces/interfaces';
import Swal from 'sweetalert2';
import { IAuthStateSelector } from '../reducer/authReducer';
import { IUsersStateSelector } from '../reducer/usersReducer';
import { IUiStateSelector } from '../reducer/uiReducer';

export const Users = () => {

    const dispatch = useDispatch();
    const user  = useSelector( ( state: IAuthStateSelector ) => state.auth.user );
    const users = useSelector( ( state: IUsersStateSelector ) => state.users.users );
    const showModal = useSelector( ( state: IUiStateSelector ) => state.ui.showModal );

    useEffect( () => {
        dispatch( startGetUsers() );
    }, [ dispatch ])

    const openAddUserModal = () => {
        if( user?.role !== 'admin' ){
            return Swal.fire(
                    'No autorizado',
                    'Solo el administrador puede agregar usuarios',
                    'error'
            )
        }
        dispatch( setShowModal( true, UserForm ) ) 
    }

    return (
        <div className="w-full flex justify-center bg-gray-200 m-h-100 relative">
            { ( showModal.bool && showModal.component ) && <Modal 
                component={ showModal.component } 
            /> }
            <div className="w-full p-4 md:w-2/4 mt-60 md:mt-36">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Usuarios registrados</span>
                    <Button 
                        className="bg-blue-500 p-3 text-white font-bold uppercase rounded" 
                        type="button"
                        value="+ Nuevo"
                        fn={ openAddUserModal }
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
