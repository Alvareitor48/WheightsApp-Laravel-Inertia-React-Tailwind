import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head, router} from "@inertiajs/react";
import React from "react";
import {IndexRoutine} from "@/Components/IndexRoutine.jsx";

export default function IndexRoutines(){
    return(
        <MainLayout>
            <Head title="Routines"/>
            <div className="min-h-screen bg-transparent">
                <div className="flex flex-row flex-wrap items-center justify-center text-white">
                    {/* Título y usuario */}
                    <div className="mb-4 mt-6 w-full">
                        <h1 className="text-center text-responsive-h2 font-semibold">Mis rutinas</h1>
                    </div>

                    <IndexRoutine></IndexRoutine>
                    <IndexRoutine></IndexRoutine>
                </div>
            </div>
        </MainLayout>
    )
}
