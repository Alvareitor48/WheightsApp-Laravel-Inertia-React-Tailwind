import { AnimatePresence, m } from "motion/react";
import { useRef } from "react";
import { useDashboard } from "../contexts/dashboardContext";
import handleTranslates from "../functions/handleTranslates";
import { SubscriptionPopUp } from "./SubscriptionPopUp";
import { usePremiumOrAdminCheck } from "../../../shared/hooks/usePremiumOrAdminCheck";
const ExercisesForMuscle = () => {
    const {
        mainMuscle,
        exercisesForMuscle,
        loadingForMuscle,
        exerciseFilter,
        setExerciseFilter,
        fetchExercisesByMuscle,
    } = useDashboard();

    const { translateExercise, translateFilter } = handleTranslates;

    const exerciseRef = useRef(null);

    const { isPopUpOpen, setIsPopUpOpen, isPremium } = usePremiumOrAdminCheck();

    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        if (
            !isPremium &&
            (selectedFilter === "3months" || selectedFilter === "year")
        ) {
            setIsPopUpOpen(true);
        } else {
            setExerciseFilter(selectedFilter);
            if (mainMuscle) {
                fetchExercisesByMuscle(mainMuscle, selectedFilter);
            }
        }
    };

    return (
        <>
            {mainMuscle !== "" ? (
                <>
                    <h2 className="text-responsive-h4 mb-4">
                        {`Ejercicios de ${translateExercise(
                            mainMuscle
                        )} (${translateFilter(exerciseFilter)})`}
                    </h2>
                    <select
                        value={exerciseFilter}
                        onChange={handleFilterChange}
                        className="mb-4 p-2 rounded bg-black text-white border border-white"
                    >
                        <option value="month">Último mes</option>
                        <option value="3months">Últimos 3 meses</option>
                        <option value="year">Último año</option>
                    </select>
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
                                {loadingForMuscle ? (
                                    <h4 className="text-responsive-h4 mb-4">
                                        Cargando ejercicios...
                                    </h4>
                                ) : exercisesForMuscle.length > 0 ? (
                                    exercisesForMuscle.map(
                                        (exercise, index) => (
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
                                                    {exercise.date}
                                                </h3>
                                                {exercise.exercises.map(
                                                    (exercise, index) => (
                                                        <m.div
                                                            key={`${exercise}-${index}`}
                                                            className="text-responsive-select border border-white/40 w-full px-2  my-2 py-4 rounded-md"
                                                        >
                                                            <h4 className="text-responsive-h4 mb-4">
                                                                {
                                                                    exercise.exercise
                                                                }
                                                            </h4>
                                                            {exercise.series.map(
                                                                (
                                                                    serie,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <m.div
                                                                            key={`${exercise}-${index}`}
                                                                            className="text-responsive-select backdrop-blur-lg border border-white/40 w-full  my-2 py-4 rounded-md z-20"
                                                                            whileHover={{
                                                                                scale: 1.1,
                                                                            }}
                                                                        >
                                                                            {`${serie.weight} kg x ${serie.repetitions} repeticiones`}
                                                                        </m.div>
                                                                    );
                                                                }
                                                            )}
                                                        </m.div>
                                                    )
                                                )}
                                            </m.div>
                                        )
                                    )
                                ) : (
                                    <div>
                                        <h4 className="text-responsive-h4 mb-4">
                                            Esta semana no has hecho ejercicios
                                            de {translateExercise(mainMuscle)}
                                        </h4>
                                    </div>
                                )}
                            </AnimatePresence>
                        </m.div>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-responsive-h4 mb-4">
                        Ejercicios hechos de cada músculo
                    </h2>
                    <p className="text-center text-gray-400">
                        Selecciona un músculo en el modelo
                    </p>
                </>
            )}
            <SubscriptionPopUp
                isOpen={isPopUpOpen}
                onClose={() => setIsPopUpOpen(false)}
            />
        </>
    );
};

export default ExercisesForMuscle;
