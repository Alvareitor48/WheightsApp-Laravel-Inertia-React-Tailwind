import MainLayout from "@/shared/layouts/MainLayout.jsx";
import {motion} from "motion/react";
import {Head, router, useForm} from "@inertiajs/react";
import React from "react";
import {PrincipalTable} from "@/modules/routines/components/PrincipalTable.jsx";
import {RoutineFormProvider} from "@/modules/routines/contexts/RoutineFormContext.jsx";
import RoutineForm from "@/modules/routines/components/RoutineForm.jsx";

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
