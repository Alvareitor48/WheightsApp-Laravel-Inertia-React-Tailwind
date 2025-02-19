import shoulder_press from "@/modules/routines/assets/images/shoulder_press.png";
import { GridTableUpdate } from "@/modules/routines/components/GridTableUpdate.jsx";
import { m } from "motion/react";
import { useUpdate } from "@/modules/routines/hooks/useUpdate";
import { useCreateSeries } from "../hooks/useCreateSeries";
import { PrincipalTableBase } from "./PrincipalTableBase";
import { handleErrors } from "../functions/handleErrors";
import { router } from "@inertiajs/react";
import AutoResizingTextarea from "./AutoResizingTextArea";
import VideoThumbnail from "@/shared/components/VideoThumbnail";
import { useTranslation } from "@/shared/hooks/useTranslation";
export function PrincipalTableUpdate({ index }) {
    const { update, data, errors } = useUpdate();
    const { createSeries } = useCreateSeries();
    const t = useTranslation();
    const handleRemoveExercise = (routineId, exerciseId, redirect_to) => {
        router.delete(
            route("routines.delete.exercise", {
                routineId,
                redirect_to,
            }),
            {
                data: { exercise_id: exerciseId },
                preserveState: true,
                only: ["exercises"],
                preserveScroll: true,
                onSuccess: () => {
                    const updatedExercises = data.exercises.filter(
                        (exercise) => exercise.id !== exerciseId
                    );
                    update(updatedExercises, true, null, null, null, true);

                    const routineProgress = {
                        routine: data.routine,
                        exercises: updatedExercises,
                    };
                    localStorage.setItem(
                        "routineProgress",
                        JSON.stringify(routineProgress)
                    );
                },
            }
        );
    };
    const headDivs = [
        <div className="flex justify-center m-1">
            <VideoThumbnail
                mediaSrc={data.exercises[index].exercise.url}
                imgClassname="h-responsive-height-table-image w-responsive-width-table-image rounded-full bg-cover bg-center"
                title={data.exercises[index].exercise.name}
            />
        </div>,
        <div className="text-center px-2 py-3">
            <h2 className="text-responsive-table font-semibold inline-block">
                {data.exercises[index].exercise.name}
            </h2>
        </div>,
        <div className="text-center">
            <AutoResizingTextarea
                onChange={(e) => update(e.target.value, true, "note", index)}
                value={data.exercises[index].note}
                className="text-responsive-note-table leading-normal resize-none w-responsive-mini-input text-gray-400 inline-block bg-transparent border-0"
            />
            {errors[`exercises.${index}.data.note`] && (
                <p className="text-red-500 text-responsive-note-table mt-1">
                    {errors[`exercises.${index}.data.note`]}
                </p>
            )}
        </div>,
        <div className="text-center px-2 py-3">
            <p className="text-responsive-table font-medium text-gray-400 inline-block">
                03:00
            </p>
        </div>,
    ];

    const tbody = data.exercises[index].series.map(function (
        serie,
        seriesIndex
    ) {
        return (
            <GridTableUpdate
                key={`${serie.id}.${index}`}
                seriesIndex={seriesIndex}
                principalIndex={index}
            ></GridTableUpdate>
        );
    });

    const aditionalDivs = (
        <>
            {handleErrors(index, errors) === "both" ? (
                <p className="text-red-500 text-responsive-note-table mt-1">
                    {t("principal_table_start_error_reps_weights")}
                </p>
            ) : handleErrors(index, errors) === "repetitions" ? (
                <p className="text-red-500 text-responsive-note-table mt-1">
                    {t("principal_table_start_error_reps")}
                </p>
            ) : handleErrors(index, errors) === "weight" ? (
                <p className="text-red-500 text-responsive-note-table mt-1">
                    {t("principal_table_start_error_weights")}
                </p>
            ) : null}
            <m.button
                type="button"
                className="glass pb-1 mt-5 w-full h-responsive-normal-button-height text-responsive-h4"
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                    e.preventDefault();
                    createSeries(index);
                }}
            >
                {t("principal_table_start_add_series")}
            </m.button>
            <m.button
                type="button"
                className="w-responsive-remove-button-width h-responsive-remove-button-height absolute z-20 -right-4 top-3 bg-red-600 rounded-full text-responsive-note-table"
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                    e.preventDefault();
                    handleRemoveExercise(
                        data.routine.id,
                        data.exercises[index].id,
                        "routines.edit"
                    );
                }}
            >
                <m.span whileHover={{ scale: 1.2 }}>X</m.span>
            </m.button>
        </>
    );
    return (
        <>
            <PrincipalTableBase
                headDivs={headDivs}
                tbody={tbody}
                aditionalDivs={aditionalDivs}
            ></PrincipalTableBase>
        </>
    );
}
