import { useSelector } from "react-redux"
import { IObservationsStatesPerUser } from "../interfaces/interfaces";
import { IObservationsStateSelector } from "../reducer/observationsReducer";

export const ObservationPerUsers = () => {
    const observationsStatesPerUser = useSelector( ( state: IObservationsStateSelector ) => state.observations.observationsStatesPerUser );

    return (
        <>
            <h2 className="text-xl font-bold">Observaciones por empleado</h2>
            <table className="text-sm md:text-base table-auto w-full border border-blue-500 border-separate mt-10">
                <thead>
                    <tr>
                        <th className="text-center">Empleado</th>
                        <th className="text-center">Registradas</th>
                        <th className="text-center">Aceptadas</th>
                        <th className="text-center">Rechazadas</th>
                    </tr>
                </thead>
                <tbody>
                    { observationsStatesPerUser.length > 0 && observationsStatesPerUser.map( ( item: IObservationsStatesPerUser ) => (
                        <tr key={ item.username }>
                            <td className="text-center border-t border-blue-500">{ item.username }</td>
                            <td className="text-center border-t border-blue-500">{ item.registered }</td>
                            <td className="text-center border-t border-blue-500">{ item.accepted }</td>
                            <td className="text-center border-t border-blue-500">{ item.rejected }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
