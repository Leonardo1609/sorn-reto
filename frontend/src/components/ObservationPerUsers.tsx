import { useSelector } from "react-redux"

export const ObservationPerUsers = () => {
    const { observationsStatePerUser } = useSelector( ( state: any ) => state.observations );
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
                    { observationsStatePerUser && observationsStatePerUser.map( ( item: any ) => (
                        <tr key={ item.username }>
                            <td className="text-center border-t border-blue-500">{ item.username }</td>
                            <td className="text-center border-t border-blue-500">{ item.registers }</td>
                            <td className="text-center border-t border-blue-500">{ item.accepted }</td>
                            <td className="text-center border-t border-blue-500">{ item.rejected }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
