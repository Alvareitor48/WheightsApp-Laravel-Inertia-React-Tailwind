import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head, router} from "@inertiajs/react";
import React from "react";
import {IndexRoutine} from "@/Components/IndexRoutine.jsx";

export default function IndexRoutines({routines}){
    console.log(routines)
    return(
        <MainLayout>
            <Head title="Routines"/>
            <div className="min-h-screen bg-transparent">
                <div className="flex flex-row flex-wrap items-center justify-center text-white">
                    {/* Título y usuario */}
                    <div className="mb-4 mt-6 w-full">
                        <h1 className="text-center text-responsive-h2 font-semibold">Mis rutinas</h1>
                    </div>
                    {
                        routines.map(function (routine){
                            return <IndexRoutine key={`${routine.id}.${routine.user_id}`} name={routine.name} day={routine.day} description={routine.description}></IndexRoutine>
                        })
                    }
                </div>
            </div>
        </MainLayout>
    )
}
