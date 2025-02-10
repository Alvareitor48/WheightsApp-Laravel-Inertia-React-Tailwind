import MainLayout from "@/shared/layouts/MainLayout";
import { m } from "motion/react";
import Pagination from "../components/Pagination";
import ExerciseCard from "../components/ExerciseCard";
import { router } from "@inertiajs/react";
import { CardRouteButton } from "../components/CardRouteButton";

export default function IndexExercises({ exercises, routineId, redirect_to }) {
    return (
        <MainLayout>
            <m.div className="min-h-screen bg-transparent p-8 relative">
                <h1 className="text-responsive-h2 font-bold text-white mb-8 text-center">
                    Ejercicios
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {exercises.data.map((exercise, index) => (
                        <ExerciseCard
                            key={`${exercise.id}.${index}`}
                            id={exercise.id}
                            name={exercise.name}
                            image={exercise.url}
                            equipment={exercise.equipment}
                            muscles={exercise.muscles}
                            extraButton={
                                <CardRouteButton
                                    onClick={() =>
                                        router.visit(
                                            route("routines.add.exercise", {
                                                routineId: routineId, // Parámetro obligatorio
                                                redirect_to: redirect_to,
                                            }),
                                            {
                                                method: "put", // Especificar el método HTTP
                                                data: {
                                                    exercise_id: exercise.id,
                                                },
                                            }
                                        )
                                    }
                                    title="Añadir+"
                                ></CardRouteButton>
                            }
                        ></ExerciseCard>
                    ))}
                </div>
                <Pagination links={exercises.links} />
            </m.div>
        </MainLayout>
    );
}
