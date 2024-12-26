import MainLayout from "@/shared/layouts/MainLayout.jsx";
import {m} from "motion/react";
import {Head, router} from "@inertiajs/react";
import React from "react";
import {PrincipalTableShow} from "@/modules/routines/components/PrincipalTableShow.jsx";
import { RoutineFormProvider } from "../contexts/RoutineFormContext";
import { useUpdate } from "../hooks/useUpdate";
import RoutineShow from "../components/RoutineShow";

export default function AdminRoutines({routine,exercises}){
    return(
        <MainLayout>
            <RoutineFormProvider initialData={{
                            routine:routine,
                            exercises:exercises
                        }}>
            <Head title="Routines"/>
                        <RoutineShow/>
            </RoutineFormProvider>
        </MainLayout>
    )
}
