import { Head } from "@inertiajs/react";
import React from "react";
import { RoutineFormProvider } from "../contexts/RoutineFormContext";
import RoutineShow from "../components/RoutineShow";
import SimpleLayout from "@/shared/layouts/SimpleLayout";

export default function AdminRoutines({ routine, exercises }) {
    return (
        <SimpleLayout>
            <RoutineFormProvider
                initialData={{
                    routine: routine,
                    exercises: exercises,
                }}
            >
                <Head title="Routines" />
                <RoutineShow />
            </RoutineFormProvider>
        </SimpleLayout>
    );
}
