import { AnimatePresence, m } from "motion/react";
import { useRef } from "react";
import { useDashboard } from "../contexts/dashboardContext";
import handleTranslates from "../functions/handleTranslates";
import { SubscriptionPopUp } from "./SubscriptionPopUp";
import { usePremiumOrAdminCheck } from "../../../shared/hooks/usePremiumOrAdminCheck";
import { useTranslation } from "@/shared/hooks/useTranslation";
const ExercisesForMuscle = () => {
    const {
        mainMuscle,
        exercisesForMuscle,
        loadingForMuscle,
        exerciseFilter,
        setExerciseFilter,
        fetchExercisesByMuscle,
    } = useDashboard();

    const exerciseRef = useRef(null);

    const { isPopUpOpen, setIsPopUpOpen, isPremium } = usePremiumOrAdminCheck();

    const { translateFilter } = handleTranslates;
    const t = useTranslation();

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
                        {t("exercises_title_part1")} {t(`muscle_${mainMuscle}`)}{" "}
                        {t("exercises_title_part2")}{" "}
                        {t(`filter_${exerciseFilter}`)}
                    </h2>
                    <select
                        value={exerciseFilter}
                        onChange={handleFilterChange}
                        className="mb-4 p-2 rounded bg-black text-white border border-white"
                    >
                        <option value="month">{t(`filter_month`)}</option>
                        <option value="3months">{t(`filter_3months`)}</option>
                        <option value="year">{t(`filter_year`)}</option>
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
                                        {t("exercises_loading")}
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
                                                                            {
                                                                                serie.weight
                                                                            }{" "}
                                                                            {t(
                                                                                "exercises_series_part2"
                                                                            )}{" "}
                                                                            {
                                                                                serie.repetitions
                                                                            }{" "}
                                                                            {t(
                                                                                "exercises_series_part3"
                                                                            )}
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
                                            {t("exercises_no_data_part1")}{" "}
                                            {t(`muscle_${mainMuscle}`)}{" "}
                                            {t("exercises_no_data_part2")}
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
                        {t("exercises_each_muscle")}
                    </h2>
                    <p className="text-center text-gray-400">
                        {t("exercises_select_muscle")}
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
