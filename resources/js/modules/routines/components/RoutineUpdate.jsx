import { m } from "motion/react";
import { router } from "@inertiajs/react";
import { PrincipalTableUpdate } from "@/modules/routines/components/PrincipalTableUpdate.jsx";
import { useRoutineForm } from "@/modules/routines/contexts/RoutineFormContext.jsx";
import { useUpdate } from "@/modules/routines/hooks/useUpdate";
import AutoResizingTextarea from "./AutoResizingTextArea";
import { useTranslation } from "@/shared/hooks/useTranslation";

export default function RoutineUpdate() {
    const { put, processing, errors } = useRoutineForm();
    const { update, data } = useUpdate();
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("routines.update", data.routine.id), {
            routine: data.routine,
            exercises: data.exercises,
        });
    };
    const t = useTranslation();
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-transparent flex flex-col items-center min-h-screen text-white"
        >
            <div className="text-center mb-4 flex flex-col items-center">
                <AutoResizingTextarea
                    onChange={(e) => update(e.target.value, 0, "name")}
                    value={data.routine.name}
                    className="inline-block w-responsive-input text-responsive-h2 leading-normal font-semibold bg-black border-0 resize-none"
                />
                {errors["routine.name"] && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors["routine.name"]}
                    </p>
                )}
                <AutoResizingTextarea
                    onChange={(e) => update(e.target.value, 0, "description")}
                    value={data.routine.description}
                    className="inline-block w-responsive-input text-gray-400 text-responsive-h4 leading-normal my-4 mx-8 bg-black border-0 resize-none"
                />
                {errors["routine.description"] && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors["routine.description"]}
                    </p>
                )}
                <span className="text-gray-200 text-responsive-h4 font-semibold my-4">
                    {t("routine_start_created_by")} {data.routine.user.name}
                </span>
            </div>

            {data.exercises.map(function (exercise, index) {
                return (
                    <PrincipalTableUpdate
                        key={`${exercise.exercise.id}.${index}`}
                        index={index}
                    ></PrincipalTableUpdate>
                );
            })}
            <m.button
                type="button"
                className="glass pb-1 mt-5 w-5/6 h-responsive-normal-button-height text-responsive-h4"
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                    router.visit(
                        route("routines.add.exercises", {
                            routineId: data.routine.id,
                            redirect_to: "routines.edit",
                        })
                    );
                }}
            >
                {t("routine_start_add_exercise")}
            </m.button>
            <m.button
                className="bg-lilaPrincipal pb-1 mt-10 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-h4 rounded-xl"
                whileHover={{ backgroundColor: "#8F3985", scale: 1.1 }}
                type="submit"
                disabled={processing}
            >
                {t("routine_start_finish_routine")}
            </m.button>
        </form>
    );
}
