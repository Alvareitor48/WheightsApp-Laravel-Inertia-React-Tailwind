import { Head } from "@inertiajs/react";
import React from "react";
import { RoutineFormProvider } from "../contexts/RoutineFormContext";
import RoutineShow from "../components/RoutineShow";
import SimpleLayout from "@/shared/layouts/SimpleLayout";
import { SerieCheckedProvider } from "../contexts/SerieCheckedContext";

export default function AdminRoutines({ routine, exercises, stadistics, isSession }) {
    return (
        <SimpleLayout>
            <Head title="Routine" />
            <SerieCheckedProvider>
                <RoutineFormProvider
                    initialData={{
                        routine: routine,
                        exercises: exercises,
                    }}
                >
                    <Head title="Routines" />
                    <RoutineShow stadistics={stadistics} isSession={isSession} />
                </RoutineFormProvider>
            </SerieCheckedProvider>
        </SimpleLayout>
    );
}
