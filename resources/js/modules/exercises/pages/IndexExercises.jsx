import MainLayout from "@/shared/layouts/MainLayout";
import { m } from "motion/react";
import Pagination from "../components/Pagination";
import ExerciseCard from "../components/ExerciseCard";
import {Head, useForm} from "@inertiajs/react";
import { Auth } from "@/shared/components/Auth";
import { useTranslation } from "@/shared/hooks/useTranslation";

export default function IndexExercises({ exercises, equipments, muscles }) {
    const { data, setData, get } = useForm({
        equipment: "",
        muscle: "",
        my_exercises: "",
    });
    const t = useTranslation();

    const handleMyExercises = (e) => {
        setData("my_exercises", e.target.value);
    };

    const handleFilterChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route("exercises.index"), {
            params: data,
            preserveState: true,
        });
    };

    const handleClearFilters = () => {
        setData({ equipment: "", muscle: "" });
        get(route("exercises.index"), {
            preserveState: true,
        });
    };
    return (
        <MainLayout>
            <Head title="Index" />
            <m.div className="min-h-screen bg-transparent p-8 relative">
                <h1 className="text-responsive-h2 font-bold text-white mb-8 text-center">
                    {t("exercises_index_title")}
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-transparent p-6 rounded shadow-lg mb-8"
                >
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-white">
                            {t("exercises_index_filter_equipment")}
                        </label>
                        <select
                            name="equipment"
                            value={data.equipment}
                            onChange={handleFilterChange}
                            className="border bg-transparent border-gray-300 rounded p-2 mt-1"
                        >
                            <option value="">
                                {t("exercises_index_filter_all")}
                            </option>
                            {equipments.map((equip, index) =>
                                equip ? (
                                    <option key={index} value={equip}>
                                        {equip}
                                    </option>
                                ) : null
                            )}
                            <option value={"Sin equipamiento"}>
                                {t("exercises_index_filter_no_equipment")}
                            </option>
                        </select>
                    </div>

                    <div className="flex flex-col mt-4">
                        <label className="text-sm font-semibold text-white">
                            {t("exercises_index_filter_muscles")}
                        </label>
                        <select
                            name="muscle"
                            value={data.muscle}
                            onChange={handleFilterChange}
                            className="border border-gray-300 bg-transparent rounded p-2 mt-1"
                        >
                            <option value="">
                                {t("exercises_index_filter_all")}
                            </option>
                            {muscles.map((muscle, index) => (
                                <option key={index} value={muscle}>
                                    {muscle === "Deltoides Frontal"
                                        ? "Deltoides Frontal y Lateral"
                                        : muscle}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Auth roles={["admin", "premium"]}>
                        <div className="flex flex-col mt-4">
                            <label className="text-sm font-semibold text-white">
                                {t("exercises_index_filter_my_exercises")}
                            </label>
                            <select
                                name="muscle"
                                value={data.my_exercises}
                                onChange={handleMyExercises}
                                className="border border-gray-300 bg-transparent rounded p-2 mt-1"
                            >
                                <option value="">Todos</option>
                                <option value="Mis ejercicios">
                                    {t(
                                        "exercises_index_filter_my_exercises_option"
                                    )}
                                </option>
                                <option value="Ejercicios normales">
                                    {t(
                                        "exercises_index_filter_normal_exercises"
                                    )}
                                </option>
                            </select>
                        </div>
                    </Auth>

                    {/* Botones de acción */}
                    <div className="flex space-x-4 mt-4">
                        <m.button
                            type="submit"
                            className="px-4 py-2 bg-lilaPrincipal text-white rounded-md hover:bg-lilaSecundario"
                            whileHover={{
                                scale: 1.1,
                            }}
                        >
                            {t("exercises_index_filter_button")}
                        </m.button>
                        <m.button
                            type="button"
                            onClick={handleClearFilters}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            whileHover={{
                                scale: 1.1,
                            }}
                        >
                            {t("exercises_index_clear_button")}
                        </m.button>
                    </div>
                </form>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {exercises.data.map((exercise, index) => (
                        <ExerciseCard
                            key={`${exercise.id}.${index}`}
                            id={exercise.id}
                            name={exercise.name}
                            image={exercise.url}
                            equipment={exercise.equipment}
                            muscles={exercise.muscles}
                        ></ExerciseCard>
                    ))}
                </div>
                <Pagination links={exercises.links} />
            </m.div>
        </MainLayout>
    );
}
