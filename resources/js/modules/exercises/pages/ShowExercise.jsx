import { useTranslation } from "@/shared/hooks/useTranslation";
import MainLayout from "@/shared/layouts/MainLayout";

export default function ShowExercise({ exercise }) {
    const t = useTranslation();
    const isImage = exercise.url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
    const mediaType = isImage ? "image" : "video";
    return (
        <MainLayout>
            <div className="min-h-screen bg-transparent text-white p-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-responsive-h1 font-bold mb-4">
                        {exercise.name}
                    </h1>

                    <div className="mb-6">
                        {mediaType === "image" ? (
                            <img
                                src={`http://laravel-react.test/${exercise.url}`}
                                alt={exercise.name}
                                className="w-full h-auto rounded-lg object-cover"
                            />
                        ) : (
                            <video
                                src={`http://laravel-react.test/${exercise.url}`}
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{ pointerEvents: "none" }}
                                className="w-full h-auto rounded-lg object-cover"
                            >
                                {t("show_exercise_video_not_supported")}
                            </video>
                        )}
                    </div>

                    <div className="mb-6">
                        <h2 className="text-responsive-h2 font-semibold mb-2">
                            {t("show_exercise_description")}
                        </h2>
                        <p className="text-responsive-h4">
                            {exercise.description}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-responsive-h4 font-semibold mb-2">
                                {t("show_exercise_equipment")}
                            </h2>
                            {exercise.equipment !== null ? (
                                <span className="bg-blue-900 bg-opacity-70 text-white px-2 py-1 rounded-full text-responsive-note-table">
                                    {exercise.equipment}
                                </span>
                            ) : (
                                <span className="bg-blue-900 bg-opacity-70 text-white px-2 py-1 rounded-full text-responsive-note-table">
                                    {t("show_exercise_no_equipment")}
                                </span>
                            )}
                        </div>

                        <div>
                            <h2 className="text-responsive-h4 font-semibold mb-2">
                                {t("show_exercise_muscles")}
                            </h2>
                            <div className="space-x-3">
                                {exercise.muscles.map((muscle, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-900 bg-opacity-70 text-white px-2 py-1 rounded-full text-responsive-note-table"
                                    >
                                        {muscle}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
