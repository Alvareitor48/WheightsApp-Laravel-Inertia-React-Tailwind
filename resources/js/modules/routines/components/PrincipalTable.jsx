import shoulder_press from '@/modules/routines/assets/images/shoulder_press.png'
import {useRoutineForm} from "@/modules/routines/contexts/RoutineFormContext.jsx";
import {GridTable} from "@/modules/routines/components/GridTable.jsx";
export function PrincipalTable({index,series}) {
    const {data,setData} = useRoutineForm()

    const updateNote = (newData) => {
        const updatedExercises = [...data.exercises];
        updatedExercises[index].data.note = newData;

        setData("exercises", updatedExercises);
    };
    return (
        <>
            <div className="m-auto w-[90%] mt-6 mb-6">

                <div
                    className="border border-gray-300 border-b-0 rounded-t-xl glasstop grid grid-cols-4 items-center justify-between mt-8 mb-1">

                    <div className="flex justify-center m-1">
                        <div
                            className="h-responsive-height-table-image w-responsive-width-table-image rounded-full bg-cover bg-center"
                            style={{backgroundImage: `url(${shoulder_press})`}}
                        ></div>
                    </div>

                    {/* Título del Ejercicio */}
                    <div className="text-center px-2 py-3">
                        <h2 className="text-responsive-table font-semibold inline-block">{data.exercises[index].data.exercise[index].name}</h2>
                    </div>

                    {/* Notas */}
                    <div className="text-center">
                        <textarea
                            rows={1}
                            className="text-responsive-note-table leading-normal resize-none w-responsive-mini-input text-gray-400 inline-block bg-transparent border-0"
                            value={data.exercises[index].data.note}
                            onChange={(e)=>updateNote(e.target.value)}
                            onInput={(e) => {
                                e.target.style.height = "auto"; // Resetea el alto
                                e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta al contenido
                            }}
                        />
                    </div>

                    {/* Temporizador (No funcional) */}
                    <div className="text-center px-2 py-3">
                        <p className="text-responsive-table font-medium text-gray-400 inline-block">03:00</p>
                    </div>
                </div>

                <table
                    className="text-responsive-table border-separate border-spacing-0 glassbottom border border-gray-300 border-t-0 rounded-b-xl w-full">
                    <thead>
                    <tr className="text-white uppercase leading-normal">
                        <th className="w-1/4 py-3 px-2 text-center">Serie</th>
                        <th className="w-1/4 py-3 px-2 text-center">Reps</th>
                        <th className="w-1/4 py-3 px-2 text-center">Peso</th>
                        <th className="w-1/4 py-3 px-2 text-center">RIR</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700">
                    {
                        series.map(function (serie,seriesIndex){
                            return (
                                <GridTable key={`${serie.id}.${index}`} seriesIndex={seriesIndex} principalIndex={index}></GridTable>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}
