import { HorizontalBar } from "react-chartjs-2"
import { useSelector } from "react-redux";
import { IQuantityObervationPerState } from "../interfaces/interfaces";
import { IObservationsStateSelector } from "../reducer/observationsReducer";

export const ChartObservationsPerState = () => {

    const quantityObservationsPerState = useSelector( ( state: IObservationsStateSelector ) => state.observations.quantityObservationsPerState );

    const getQuantity = ( idState: number ) => ( 
        quantityObservationsPerState.find( ( item: IQuantityObervationPerState ) => item.idState === idState  )?.count || 0
    );

    return (
        <>
            <h2 className="text-xl font-bold">Observaciones Totales</h2>
            <HorizontalBar 
                legend={{
                    display: false
                }}
                data={{
                    labels: [ 'Registrados', 'Aceptado', 'Rechazados' ],
                    datasets: [{
                        backgroundColor: [
                            'rgb(59, 130, 246)',
                            'rgb(16, 185, 129)',
                            'rgb(245, 158, 11)'
                        ],
                        minBarLength: 10,
                        data: [ getQuantity( 1 ), getQuantity( 2 ), getQuantity( 3 )]
                    }]
                }}
                width={ 200 }
                height={ 150 }
                options= {{
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 50,
                            bottom: 50
                        }
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true,
                                userCallback: function(label: number) {
                                    if (Math.floor(label) === label) {
                                        return label;
                                    }
                                },
                            },
                            scaleLabel: {
                              display: true,
                              labelString: 'Cantidad',
                              fontSize: 16,
                              fontStyle: 'bold'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                              display: true,
                              labelString: 'Estados',
                              fontSize: 16,
                              fontStyle: 'bold'
                            }
                        }]
                    }
                }}
            />            
        </>
    )
}
