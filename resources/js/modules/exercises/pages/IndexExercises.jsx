import MainLayout from "@/shared/layouts/MainLayout";
import { m } from "motion/react";
import Pagination from "../components/Pagination";
import ExerciseCard from "../components/ExerciseCard";
import { useForm } from "@inertiajs/react";
import { Auth } from "@/shared/components/Auth";

export default function IndexExercises({ exercises, equipments, muscles }) {
    const { data, setData, get } = useForm({
        equipment: "",
        muscle: "",
        my_exercises: "",
    });

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
            <m.div className="min-h-screen bg-transparent p-8 relative">
                <h1 className="text-responsive-h2 font-bold text-white mb-8 text-center">
                    Ejercicios
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-transparent p-6 rounded shadow-lg mb-8"
                >
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-white">
                            Equipamiento
                        </label>
                        <select
                            name="equipment"
                            value={data.equipment}
                            onChange={handleFilterChange}
                            className="border bg-transparent border-gray-300 rounded p-2 mt-1"
                        >
                            <option value="">Todos</option>
                            {equipments.map((equip, index) =>
                                equip ? (
                                    <option key={index} value={equip}>
                                        {equip}
                                    </option>
                                ) : null
                            )}
                            <option value={"Sin equipamiento"}>
                                Sin equipamiento
                            </option>
                        </select>
                    </div>

                    <div className="flex flex-col mt-4">
                        <label className="text-sm font-semibold text-white">
                            Músculos
                        </label>
                        <select
                            name="muscle"
                            value={data.muscle}
                            onChange={handleFilterChange}
                            className="border border-gray-300 bg-transparent rounded p-2 mt-1"
                        >
                            <option value="">Todos</option>
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
                                Mis ejercicios
                            </label>
                            <select
                                name="muscle"
                                value={data.my_exercises}
                                onChange={handleMyExercises}
                                className="border border-gray-300 bg-transparent rounded p-2 mt-1"
                            >
                                <option value="">Todos</option>
                                <option value="Mis ejercicios">
                                    Mis Ejercicios
                                </option>
                                <option value="Ejercicios normales">
                                    Ejercicios Normales
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
                            Filtrar
                        </m.button>
                        <m.button
                            type="button"
                            onClick={handleClearFilters}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            whileHover={{
                                scale: 1.1,
                            }}
                        >
                            Limpiar
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
