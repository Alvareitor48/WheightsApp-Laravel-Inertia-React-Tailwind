import {m} from "motion/react";
import {router} from "@inertiajs/react";
import { useUpdate } from '@/modules/routines/hooks/useUpdate';
import { PrincipalTableShow } from "./PrincipalTableShow";

export default function RoutineShow(){
    const {data} = useUpdate();
    return(
            <div className="bg-transparent flex flex-col items-center min-h-screen text-white">
                            {/* Título y usuario */}
                            <div className="text-center mb-4">
                                <h1 className="text-responsive-h2 font-semibold">{data.routine.name}</h1>
                                <p className="text-gray-400 text-responsive-h4 my-4 mx-8">{data.routine.description}</p>
                                <span
                                    className="text-gray-200 text-responsive-h4 font-semibold my-4">Created by {data.routine.user.name}</span>
                            </div>
            
                            {/* Botón de Comenzar Rutina*/}
                            <m.button
                                className="bg-lilaPrincipal pb-1 mt-10 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-h4 rounded-xl"
                                whileHover={{backgroundColor: "#8F3985", scale: 1.1}}
                                onClick={() => router.visit(route('AdminRoutines',data.routine.id))}
                            >
                                Comenzar Rutina
                            </m.button>
                            <m.button
                                className="bg-lilaPrincipal pb-1 mt-10 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-h4 rounded-xl"
                                whileHover={{backgroundColor: "#8F3985", scale: 1.1}}
                                onClick={() => {
                                    router.visit(route('routines.edit',data.routine.id));
                                }}
                            >
                                Actualizar Rutina
                            </m.button>
                            {
                                data.exercises.map(function (exercise, index) {
                                    return (
                                        <PrincipalTableShow
                                            key={`${exercise.data.exercise[index].id}.${index}`}
                                            index={index}
                                            series={exercise.data.series[index]}
                                        ></PrincipalTableShow>
                                    )
                                })
                            }
                        </div>
    )
}
