import { AnimatePresence, m } from "motion/react";
import { useRef } from "react";
import { useDashboard } from "../contexts/dashboardContext";
import handleTranslates from "../functions/handleTranslates";
import { SubscriptionPopUp } from "./SubscriptionPopUp";
import { usePremiumOrAdminCheck } from "../../../shared/hooks/usePremiumOrAdminCheck";
import { useTranslation } from "@/shared/hooks/useTranslation";

const MaxWeights = () => {
    const {
        mainMuscle,
        maxWeightsStats,
        loadingForMuscle2,
        weightFilter,
        setWeightFilter,
        fetchMaxWeightsByMuscle,
    } = useDashboard();

    const { translateExercise, translateFilter } = handleTranslates;

    const statsRef = useRef(null);

    const { isPopUpOpen, setIsPopUpOpen, isPremium } = usePremiumOrAdminCheck();

    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        if (
            !isPremium &&
            (selectedFilter === "3months" || selectedFilter === "year")
        ) {
            setIsPopUpOpen(true);
        } else {
            setWeightFilter(selectedFilter);
            if (mainMuscle) {
                fetchMaxWeightsByMuscle(mainMuscle, selectedFilter);
            }
        }
    };
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
    const t = useTranslation();

    return (
        <>
            {mainMuscle !== "" ? (
                <>
                    <h2 className="text-responsive-h4 mb-4">
                        {t("max_weights_title")} {t(`muscle_${mainMuscle}`)}{" "}
                        {t("max_weights_filter")} {t(`filter_${weightFilter}`)}
                    </h2>
                    <select
                        value={weightFilter}
                        onChange={handleFilterChange}
                        className="mb-4 p-2 rounded bg-black text-white border border-white"
                    >
                        <option value="month">{t(`filter_month`)}</option>
                        <option value="3months">{t(`filter_3months`)}</option>
                        <option value="year">{t(`filter_year`)}</option>
                    </select>
                    <div className="relative">
                        <div className="overflow-hidden">
                            <m.div
                                ref={statsRef}
                                className={`${
                                    maxWeightsStats.length > 0
                                        ? "grid grid-flow-col auto-cols-[150px] sm:auto-cols-[180px] md:auto-cols-[200px] lg:auto-cols-[220px] xl:auto-cols-[250px] gap-4"
                                        : loadingForMuscle2 ?? ""
                                } overflow-x-auto scrollbar-hide pb-4`}
                                style={{
                                    scrollBehavior: "smooth",
                                    WebkitOverflowScrolling: "touch",
                                }}
                            >
                                <AnimatePresence>
                                    {loadingForMuscle2 ? (
                                        <h4 className="text-responsive-h4 mb-4">
                                            {t("max_weights_loading")}
                                        </h4>
                                    ) : maxWeightsStats.length > 0 ? (
                                        maxWeightsStats.map((stat, index) => {
                                            console.log(stat);
                                            return (
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
                                                        {stat.max.exercise}
                                                    </h3>
                                                    <h4 className="text-responsive-select mb-1 sm:mb-2">
                                                        {t("max_weights_max")}{" "}
                                                        {stat.max.date}
                                                    </h4>
                                                    <p className="text-responsive-select mb-3 font-bold">
                                                        {stat.max.weight +
                                                            " kg x " +
                                                            stat.max
                                                                .repetitions +
                                                            " reps"}
                                                    </p>
                                                    <h4 className="text-responsive-select mb-1 sm:mb-2">
                                                        {t("max_weights_min")}{" "}
                                                        {stat.min.date}
                                                    </h4>
                                                    <p className="text-responsive-select font-bold">
                                                        {stat.min.weight +
                                                            " kg x " +
                                                            stat.min
                                                                .repetitions +
                                                            " reps"}
                                                    </p>
                                                </m.div>
                                            );
                                        })
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
                                                {t("max_weights_no_data_part1")}{" "}
                                                {t(`muscle_${mainMuscle}`)}{" "}
                                                {t("max_weights_no_data_part2")}
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
                        {t("max_weights_section_title")}
                    </h2>
                    <p className="text-center text-gray-400 relative">
                        {t("max_weights_select_muscle")}
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

export default MaxWeights;
