import MainLayout from "@/shared/layouts/MainLayout.jsx";
import {Head} from "@inertiajs/react";
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
