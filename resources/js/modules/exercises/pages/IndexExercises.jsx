import MainLayout from "@/shared/layouts/MainLayout";
import { m } from "motion/react";
import Pagination from "../components/Pagination";

export default function IndexExercises({ exercises }) {
    console.log(exercises);
    return (
        <MainLayout>
            <m.div className="min-h-screen bg-transparent p-8 relative">
                <h1 className="text-responsive-h2 font-bold text-white mb-8 text-center">
                    Ejercicios
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {exercises.data.map((exercise, index) => (
                        <m.div
                            className="rounded-lg overflow-hidden glass"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div
                                //src={exercise.image}
                                //alt={exercise.name}
                                width={300}
                                height={200}
                                className="w-full h-48 bg-yellow-50 object-cover"
                            ></div>
                            <div className="p-4 bg-transparent bg-opacity-50 backdrop-blur-sm">
                                <h2 className="font-bold text-white mb-2 text-responsive-table">
                                    {exercise.name}
                                </h2>
                                <p className="text-gray-400 mb-2 text-responsive-note-table">
                                    Equipamiento:{" "}
                                    {exercise.equipment === null
                                        ? "Sin Equipamiento"
                                        : exercise.equipment}
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                                    {exercise.muscles.map((muscle, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-600 bg-opacity-70 text-white px-2 py-1 rounded-full text-responsive-note-table"
                                        >
                                            {muscle}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex justify-around">
                                    <m.button
                                        className="bg-lilaPrincipal m-2 p-3 pt-1 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-note-table rounded-xl custom-flex-wrap-first-title:m-1 custom-flex-wrap-first-title:px-1"
                                        whileHover={{
                                            backgroundColor: "#8F3985",
                                            scale: 1.1,
                                        }}
                                    >
                                        Tutorial
                                    </m.button>
                                    <m.button
                                        className="bg-lilaPrincipal m-2 p-3 pt-1 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-note-table rounded-xl custom-flex-wrap-first-title:m-1 custom-flex-wrap-first-title:px-1"
                                        whileHover={{
                                            backgroundColor: "#8F3985",
                                            scale: 1.1,
                                        }}
                                    >
                                        Añadir+
                                    </m.button>
                                </div>
                            </div>
                        </m.div>
                    ))}
                </div>
            </m.div>
        </MainLayout>
    );
}
