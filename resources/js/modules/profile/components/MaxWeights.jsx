import { AnimatePresence, m } from "motion/react";
import { useRef } from "react";
import { useDashboard } from "../contexts/dashboardContext";

const MaxWeights = () => {
    const { mainMuscle, maxWeightsStats, loadingForMuscle } = useDashboard();
    const statsRef = useRef(null);
    const scroll = (direction) => {
        if (statsRef.current) {
            const scrollAmount = 200;
            if (direction === "left") {
                statsRef.current.scrollLeft -= scrollAmount;
            } else {
                statsRef.current.scrollLeft += scrollAmount;
            }
        }
    };
    const translateExercise = (muscle) => {
        switch (muscle) {
            case "trapezius":
                return "trapecio";
            case "upper-back":
                return "espalda alta";
            case "lower-back":
                return "espalda baja";
            case "chest":
                return "pecho";
            case "biceps":
                return "bíceps";
            case "triceps":
                return "tríceps";
            case "forearm":
                return "antebrazo";
            case "back-deltoids":
                return "deltoides posteriores";
            case "front-deltoids":
                return "deltoides frontales";
            case "abs":
                return "abdominales";
            case "obliques":
                return "oblicuos";
            case "adductor":
                return "aductor";
            case "hamstring":
                return "isquiotibiales";
            case "quadriceps":
                return "cuádriceps";
            case "abductors":
                return "abductores";
            case "calves":
                return "gemelos";
            case "gluteal":
                return "glúteos";
            default:
                return muscle;
        }
    };
    return (
        <>
            {mainMuscle !== "" ? (
                <>
                    <h2 className="text-responsive-h4 mb-4">
                        Pesos maximos de {translateExercise(mainMuscle)}
                    </h2>
                    <div className="relative">
                        <div className="overflow-hidden">
                            <m.div
                                ref={statsRef}
                                className={`${
                                    maxWeightsStats.length > 0
                                        ? "grid grid-flow-col auto-cols-[150px] sm:auto-cols-[180px] md:auto-cols-[200px] lg:auto-cols-[220px] xl:auto-cols-[250px] gap-4"
                                        : loadingForMuscle ?? ""
                                } overflow-x-auto scrollbar-hide pb-4`}
                                style={{
                                    scrollBehavior: "smooth",
                                    WebkitOverflowScrolling: "touch",
                                }}
                            >
                                <AnimatePresence>
                                    {loadingForMuscle ? (
                                        <h4 className="text-responsive-h4 mb-4">
                                            Cargando ejercicios...
                                        </h4>
                                    ) : maxWeightsStats.length > 0 ? (
                                        maxWeightsStats.map((stat, index) => (
                                            <m.div
                                                key={`${stat}-${index}`}
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                transition={{
                                                    delay: index * 0.1,
                                                }}
                                                className="h-[240px] sm:h-[240px] xl:h-[280px] bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center"
                                            >
                                                <h3 className="text-responsive-select mb-2 sm:mb-3">
                                                    {stat.exercise}
                                                </h3>
                                                <h4 className="text-responsive-select mb-2 sm:mb-3">
                                                    {stat.date}
                                                </h4>
                                                <p className="text-responsive-select font-bold">
                                                    {stat.weight +
                                                        " kg x " +
                                                        stat.repetitions +
                                                        " repeticiones"}
                                                </p>
                                            </m.div>
                                        ))
                                    ) : (
                                        <m.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.8,
                                            }}
                                            className="w-full"
                                        >
                                            <h4 className="text-responsive-h4 mb-4">
                                                No has hecho ejercicios de{" "}
                                                {translateExercise(mainMuscle)}{" "}
                                                en tu vida
                                            </h4>
                                        </m.div>
                                    )}
                                </AnimatePresence>
                            </m.div>
                        </div>
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
                            aria-label="Scroll left"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
                            aria-label="Scroll right"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-responsive-h4 mb-4">
                        Pesos maximos por músculo
                    </h2>
                    <p className="text-center text-gray-400 relative">
                        Selecciona un músculo en el modelo
                    </p>
                </>
            )}
        </>
    );
};

export default MaxWeights;
