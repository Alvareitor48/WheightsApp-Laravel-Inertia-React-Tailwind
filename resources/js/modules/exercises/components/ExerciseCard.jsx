import { m } from "motion/react";
import { CardRouteButton } from "./CardRouteButton";
import VideoThumbnail from "@/shared/components/VideoThumbnail";
import { router } from "@inertiajs/react";

export default function ExerciseCard({
    id,
    name,
    image,
    equipment,
    muscles,
    extraButton,
}) {
    return (
        <m.div
            className="rounded-lg overflow-hidden glass"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
        >
            <VideoThumbnail
                mediaSrc={image}
                imgClassname="w-full object-cover h-48"
                title={name}
            />
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
                            className="bg-blue-900 bg-opacity-70 text-white px-2 py-1 rounded-full text-responsive-note-table"
                        >
                            {muscle}
                        </span>
                    ))}
                </div>
                <div className="flex justify-around">
                    <CardRouteButton
                        onClick={() =>
                            router.visit(route("exercises.show", id))
                        }
                        title="Tutorial"
                    ></CardRouteButton>
                    {extraButton}
                </div>
            </div>
        </m.div>
    );
}
