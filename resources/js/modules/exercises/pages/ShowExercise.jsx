import VideoThumbnail from "@/shared/components/VideoThumbnail";
import MainLayout from "@/shared/layouts/MainLayout";

export default function ShowExercise({ exercise }) {
    console.log(exercise);
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
                                Tu navegador no soporta el elemento de video.
                            </video>
                        )}
                    </div>

                    <div className="mb-6">
                        <h2 className="text-responsive-h2 font-semibold mb-2">
                            Descripción
                        </h2>
                        <p className="text-responsive-h4">
                            {exercise.description}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-responsive-h4 font-semibold mb-2">
                                Equipamiento
                            </h2>
                            {exercise.equipment !== null ? (
                                <span className="bg-blue-900 bg-opacity-70 text-white px-2 py-1 rounded-full text-responsive-note-table">
                                    {exercise.equipment}
                                </span>
                            ) : (
                                <span className="bg-blue-900 bg-opacity-70 text-white px-2 py-1 rounded-full text-responsive-note-table">
                                    Sin equipamiento
                                </span>
                            )}
                        </div>

                        <div>
                            <h2 className="text-responsive-h4 font-semibold mb-2">
                                Músculos implicados
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
