import { m } from "motion/react";
import { CardRouteButton } from "./CardRouteButton";

export default function ExerciseCard({ name, image, equipment, muscles }) {
    return (
        <m.div
            className="rounded-lg overflow-hidden glass"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
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
                    {name}
                </h2>
                <p className="text-gray-400 mb-2 text-responsive-note-table">
                    Equipamiento:{" "}
                    {equipment === null ? "Sin Equipamiento" : equipment}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                    {muscles.map((muscle, index) => (
                        <span
                            key={index}
                            className="bg-blue-600 bg-opacity-70 text-white px-2 py-1 rounded-full text-responsive-note-table"
                        >
                            {muscle}
                        </span>
                    ))}
                </div>
                <div className="flex justify-around">
                    <CardRouteButton title="Tutorial"></CardRouteButton>
                    <CardRouteButton title="Añadir+"></CardRouteButton>
                </div>
            </div>
        </m.div>
    );
}
