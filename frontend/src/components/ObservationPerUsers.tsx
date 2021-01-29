
export const ObservationPerUsers = () => {
    return (
        <>
            <h2 className="text-xl font-bold">Observaciones por empleado</h2>
            <table className="table-auto w-full border border-blue-500 border-separate mt-10">
                <thead>
                    <tr>
                        <th className="text-center">Empleado</th>
                        <th className="text-center">Registradas</th>
                        <th className="text-center">Aceptadas</th>
                        <th className="text-center">Rechazadas</th>
                    </tr>
                </thead>
                <tbody>
                    {/* { users.map( ( user: IUser ) => (
                        <tr key={ user.id }>
                            <td className="text-center border-t border-blue-500">{ user.id }</td>
                            <td className="text-center border-t border-blue-500">{ user.username }</td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </>
    )
}
