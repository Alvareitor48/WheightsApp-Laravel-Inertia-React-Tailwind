import { Head, router } from "@inertiajs/react";
import { IndexRoutine } from "@/modules/routines/components/IndexRoutine.jsx";
import SimpleLayout from "@/shared/layouts/SimpleLayout";
import { m } from "motion/react";
import { useTranslation } from "@/shared/hooks/useTranslation";

export default function IndexRoutines({ routines }) {
    const t = useTranslation();
    const handleCreateRoutine = () => {
        router.post(route("routines.store"));
    };
    return (
        <SimpleLayout>
            <Head title="Routines" />
            <div className="min-h-screen bg-transparent">
                <div className="flex flex-row flex-wrap relative items-center justify-center text-white">
                    <div className="mb-4 mt-6 w-full">
                        <h1 className="text-center text-responsive-h2 font-semibold">
                            {t("index_routines_title")}
                        </h1>
                    </div>
                    {routines.map(function (routine) {
                        return (
                            <IndexRoutine
                                key={`${routine.id}.${routine.user_id}`}
                                id={routine.id}
                                name={routine.name}
                                description={routine.description}
                            ></IndexRoutine>
                        );
                    })}
                    <m.button
                        type="button"
                        className="w-responsive-remove-button-width h-responsive-remove-button-height absolute z-20 -bottom-24 bg-lilaPrincipal rounded-full text-responsive-note-table"
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => {
                            e.preventDefault();
                            handleCreateRoutine();
                        }}
                    >
                        <m.span whileHover={{ scale: 1.2 }}>+</m.span>
                    </m.button>
                </div>
            </div>
        </SimpleLayout>
    );
}
