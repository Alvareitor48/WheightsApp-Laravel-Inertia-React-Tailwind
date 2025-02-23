import { Head } from "@inertiajs/react";
import { RoutineFormProvider } from "@/modules/routines/contexts/RoutineFormContext.jsx";
import SimpleLayout from "@/shared/layouts/SimpleLayout";
import RoutineStart from "../components/RoutineStart";
import { SerieCheckedProvider } from "../contexts/SerieCheckedContext";

export default function StartRoutines({ routine, exercises }) {
    return (
        <SimpleLayout>
            <Head title="Session" />
            <SerieCheckedProvider>
                <RoutineFormProvider
                    initialData={{
                        routine: routine,
                        exercises: exercises,
                        durationInSeconds: 0,
                    }}
                >
                    <Head title="Routines" />
                    <RoutineStart />
                </RoutineFormProvider>
            </SerieCheckedProvider>
        </SimpleLayout>
    );
}
