import MainLayout from "@/Layouts/MainLayout.jsx";
import {motion} from "motion/react";
import {Head, router, useForm} from "@inertiajs/react";
import React from "react";
import {PrincipalTable} from "@/Components/PrincipalTable.jsx";
import {RoutineFormProvider} from "@/Context/RoutineFormContext.jsx";
import RoutineForm from "@/Pages/RoutineForm.jsx";

export default function UpdateRoutines({routine,exercises}){
    return(
        <MainLayout>
            <RoutineFormProvider initialData={{
                routine:routine,
                exercises:exercises
            }}>
            <Head title="Routines"/>
                <RoutineForm/>
            </RoutineFormProvider>
        </MainLayout>
)
}
