import MainLayout from "@/shared/layouts/MainLayout.jsx";
import {motion} from "motion/react";
import {Head, router} from "@inertiajs/react";
import React from "react";
import {PrincipalTable} from "@/modules/routines/components/PrincipalTable.jsx";

export default function AdminRoutines({routine,exercises}){
    return(
        <MainLayout>
            <Head title="Routines"/>
            <div className="bg-transparent flex flex-col items-center min-h-screen text-white">
                {/* Título y usuario */}
                <div className="text-center mb-4">
                    <h1 className="text-responsive-h2 font-semibold">{routine.name}</h1>
                    <p className="text-gray-400 text-responsive-h4 my-4 mx-8">{routine.description}</p>
                    <span
                        className="text-gray-200 text-responsive-h4 font-semibold my-4">Created by {routine.user.name}</span>
                </div>

                {/* Botón de Comenzar Rutina*/}
                <motion.button
                    className="bg-lilaPrincipal pb-1 mt-10 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-h4 rounded-xl"
                    whileHover={{backgroundColor: "#8F3985", scale: 1.1}}
                    onClick={() => router.visit(route('AdminRoutines'))}
                >
                    Comenzar Rutina
                </motion.button>
                <motion.button
                    className="bg-lilaPrincipal pb-1 mt-10 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-h4 rounded-xl"
                    whileHover={{backgroundColor: "#8F3985", scale: 1.1}}
                    onClick={() => {
                        router.visit(route('routines.edit',routine.id));
                    }}
                >
                    Actualizar Rutina
                </motion.button>
                {
                    exercises.map(function (exercise, index) {
                        return (
                            <PrincipalTable
                                key={`${exercise.data.exercise[index].id}.${index}`}
                                name={exercise.data.exercise[index].name}
                                description={exercise.data.note}
                                series={exercise.data.series[index]}
                            ></PrincipalTable>
                        )
                    })
                }
            </div>

        </MainLayout>
    )
}
