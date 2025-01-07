import { Head } from "@inertiajs/react";
import { RoutineFormProvider } from "@/modules/routines/contexts/RoutineFormContext.jsx";
import RoutineUpdate from "@/modules/routines/components/RoutineUpdate.jsx";
import SimpleLayout from "@/shared/layouts/SimpleLayout";

export default function UpdateRoutines({ routine, exercises }) {
    return (
        <SimpleLayout>
            <RoutineFormProvider
                initialData={{
                    routine: routine,
                    exercises: exercises,
                }}
            >
                <Head title="Routines" />
                <RoutineUpdate />
            </RoutineFormProvider>
        </SimpleLayout>
    );
}
