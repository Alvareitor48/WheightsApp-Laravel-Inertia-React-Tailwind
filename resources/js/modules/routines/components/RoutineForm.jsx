import React from "react";
import UpdateRoutines from "@/modules/routines/pages/UpdateRoutines.jsx";
import {motion} from "motion/react";
import {router} from "@inertiajs/react";
import {PrincipalTable} from "@/modules/routines/components/PrincipalTable.jsx";
import {useRoutineForm} from "@/modules/routines/contexts/RoutineFormContext.jsx";

export default function RoutineForm(){
    const {data, setData, put, processing, errors} = useRoutineForm()

    console.log(data)
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('routines.update'),{
            routine:data.routine,
            exercises:data.exercises
        });
    };

    const updateRoutine = (name,newData)=>{
        setData('routine', {
            ...data.routine,
            [name]: newData
        });
    }
    return(
            <form onSubmit={handleSubmit} className="bg-transparent flex flex-col items-center min-h-screen text-white">
                {/* Título y usuario */}
                <div className="text-center mb-4 flex flex-col items-center">
                    <textarea
                        rows={1}
                        value={data.routine.name}
                        onChange={(e) => updateRoutine('name', e.target.value)}
                        className="inline-block w-responsive-input text-responsive-h2 leading-normal font-semibold bg-black border-0 resize-none"
                        onInput={(e) => {
                            e.target.style.height = "auto"; // Resetea el alto
                            e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta al contenido
                        }}
                    />
                    <textarea
                        rows={1}
                        value={data.routine.description}
                        onChange={(e) => updateRoutine('description', e.target.value)}
                        className="inline-block w-responsive-input text-gray-400 text-responsive-h4 leading-normal my-4 mx-8 bg-black border-0 resize-none"
                        onInput={(e) => {
                            e.target.style.height = "auto"; // Resetea el alto
                            e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta al contenido
                        }}
                    />
                    <span
                        className="text-gray-200 text-responsive-h4 font-semibold my-4">Created by {data.routine.user.name}</span>
                </div>

                {/* Botón de Comenzar Rutina*/}
                <motion.button
                    className="bg-lilaPrincipal pb-1 mt-10 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-h4 rounded-xl"
                    whileHover={{backgroundColor: "#8F3985", scale: 1.1}}
                    onClick={() => router.visit(route('AdminRoutines'))}
                >
                    Comenzar Rutina
                </motion.button>
                {
                    data.exercises.map(function (exercise, index) {
                        return (
                            <PrincipalTable
                                key={`${exercise.data.exercise[index].id}.${index}`}
                                index={index}
                                series={exercise.data.series[index]}
                            ></PrincipalTable>
                        )
                    })
                }

                <motion.button
                    className="bg-lilaPrincipal pb-1 mt-10 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-h4 rounded-xl"
                    whileHover={{backgroundColor: "#8F3985", scale: 1.1}}
                    type="submit"
                    disabled={processing}
                >Guardar Rutina
                </motion.button>
            </form>
    )
}
