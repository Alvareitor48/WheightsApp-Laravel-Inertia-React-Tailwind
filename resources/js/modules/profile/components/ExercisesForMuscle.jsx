import { AnimatePresence, m } from "motion/react";
import { useRef } from "react";
const ExercisesForMuscle = ({ mainMuscle, exercises }) => {
    const exerciseRef = useRef(null);
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
                        {`Ejercicios hechos de ${translateExercise(
                            mainMuscle
                        )} esta semana`}
                    </h2>
                    <div className="aspect-[2/2] max-h-[400px] bg-white/5 rounded-md overflow-y-auto scrollbar-hide p-4 w-full">
                        <m.div
                            ref={exerciseRef}
                            className="flex flex-col gap-4"
                            style={{
                                scrollBehavior: "smooth",
                                WebkitOverflowScrolling: "touch",
                            }}
                        >
                            <AnimatePresence>
                                {exercises.map((exercise, index) => (
                                    <m.div
                                        key={`${exercise}-${index}`}
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
                                        className=" bg-white/0 border border-white/120 rounded-lg p-3 flex flex-col justify-center items-center my-1"
                                    >
                                        <h3 className="text-responsive-h4 mb-4">
                                            {exercise.name}
                                        </h3>
                                        {exercise.series.map((serie, index) => (
                                            <m.div
                                                key={`${serie}-${index}`}
                                                className="text-responsive-select backdrop-blur-lg border border-white/40 w-full  my-2 py-4 rounded-md z-10"
                                                whileHover={{
                                                    scale: 1.1,
                                                }}
                                            >{`${serie.weight} x ${serie.repetitions} repeticiones`}</m.div>
                                        ))}
                                    </m.div>
                                ))}
                            </AnimatePresence>
                        </m.div>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-responsive-h4 mb-4">
                        Ejercicios hechos de cada músculo esta semana
                    </h2>
                    <p className="text-center text-gray-400">
                        Selecciona un músculo en el modelo
                    </p>
                </>
            )}
        </>
    );
};

export default ExercisesForMuscle;
