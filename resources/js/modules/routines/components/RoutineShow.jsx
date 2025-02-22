import { router } from "@inertiajs/react";
import { useUpdate } from "@/modules/routines/hooks/useUpdate";
import { PrincipalTableShow } from "./PrincipalTableShow";
import { RouteButton } from "./RouteButton";
import Chart from "../components/Chart";
import { useEffect, useState } from "react";
import { usePremiumOrAdminCheck } from "@/shared/hooks/usePremiumOrAdminCheck";
import { SubscriptionPopUp } from "@/modules/profile/components/SubscriptionPopUp";
import { m } from "motion/react";
import { useTranslation } from "@/shared/hooks/useTranslation";

export default function RoutineShow({ stadistics, isSession }) {
    const { data } = useUpdate();
    const [chartHeight, setChartHeight] = useState(300);
    const [chartWidth, setChartWidth] = useState(300);
    const [chartFilter, setChartFilter] = useState("month");
    const { isPopUpOpen, setIsPopUpOpen, isPremium } = usePremiumOrAdminCheck();
    const [loadingForChart, setLoadingForChart] = useState(false);
    const [filterStadistics, setFilterStadistics] = useState(stadistics);
    const [loading, setLoading] = useState(false);
    const t = useTranslation();

    useEffect(() => {
        const updateChartHeight = () => {
            const screenWidth = window.innerWidth;
            const newHeight = Math.max(200, screenWidth * 0.15);
            const newWidth = Math.max(200, screenWidth * 0.6);
            setChartHeight(newHeight);
            setChartWidth(newWidth);
        };

        updateChartHeight();

        window.addEventListener("resize", updateChartHeight);

        return () => {
            window.removeEventListener("resize", updateChartHeight);
        };
    }, []);

    const fetchChart = (period) => {
        setLoadingForChart(true);
        router.get(
            route("routines.update.chart", data.routine.id),
            { period: period },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onSuccess: (page) => {
                    if (page.props.stadistics) {
                        setFilterStadistics(page.props.stadistics);
                    }
                    setLoadingForChart(false);
                },
                onError: () => setLoadingForChart(false),
            }
        );
    };

    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        if (
            !isPremium &&
            (selectedFilter === "3months" || selectedFilter === "year")
        ) {
            setIsPopUpOpen(true);
        } else {
            setChartFilter(selectedFilter);
            fetchChart(selectedFilter);
        }
    };
    const handleExportPDF = () => {
        if (!isPremium) {
            setIsPopUpOpen(true);
        } else {
            setLoading(true);
            router.post(
                route("routines.generate.pdf", { routineId: data.routine.id }),
                {},
                {
                    onSuccess: () => {
                        router.get(
                            route("routines.download.pdf", {
                                routineId: data.routine.id,
                            }),
                            {},
                            {
                                onSuccess: () => {
                                    setLoading(false);
                                    window.open(
                                        route("routines.download.pdf", {
                                            routineId: data.routine.id,
                                        }),
                                        "_blank",
                                        "noopener,noreferrer"
                                    );
                                },
                            }
                        );
                    },
                }
            );
        }
    };
    const handleRemoveRoutine = () => {
        router.delete(
            route("routines.destroy", data.routine.id),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onSuccess: () => {
                    router.visit("routines.index");
                },
            }
        );
    };
    return (
        <>
            <div className="bg-transparent flex flex-col items-center min-h-screen text-white">
                {!isSession &&
                <div className="w-full flex justify-between p-4">
                    <m.button
                        className="bg-lilaPrincipal text-white text-responsive-select py-1 px-2 rounded-md"
                        onClick={handleRemoveRoutine}
                        whileHover={{ backgroundColor: "#8F3985", scale: 1.1 }}
                    >
                        {t("routine_show_delete")}
                    </m.button>
                    <m.button
                        className="bg-lilaPrincipal text-white text-responsive-select py-1 px-2 rounded-md"
                        onClick={handleExportPDF}
                        whileHover={{ backgroundColor: "#8F3985", scale: 1.1 }}
                    >
                        {loading
                            ? t("routine_show_exporting_pdf")
                            : t("routine_show_export_pdf")}
                    </m.button>
                </div>
                }
                <div className="text-center flex flex-col items-center justify-center mb-4 w-2/4">
                    <h1 className="text-responsive-h2 font-semibold break-all">
                        {data.routine.name}
                    </h1>
                    <p className="text-gray-400 text-responsive-h4 my-4 mx-8 break-all">
                        {data.routine.description}
                    </p>
                    <span className="text-gray-200 text-responsive-h4 font-semibold my-4">
                        {t("routine_show_created_by")} {data.routine.user.name}
                    </span>
                    {!isSession &&
                    <div className="w-full h-[40vh] flex flex-col justify-center items-center">
                        <select
                            value={chartFilter}
                            onChange={handleFilterChange}
                            className="p-2 rounded bg-black text-white border border-white"
                        >
                            <option value="month">
                                {t("routine_show_filter_month")}
                            </option>
                            <option value="3months">
                                {t("routine_show_filter_3months")}
                            </option>
                            <option value="year">
                                {t("routine_show_filter_year")}
                            </option>
                        </select>
                        {loadingForChart ? (
                            <div>
                                <h4 className="text-responsive-h4 mb-4">
                                    {t("routine_show_loading")}
                                </h4>
                            </div>
                        ) : (
                            <Chart
                                data={filterStadistics}
                                height={chartHeight}
                                width={chartWidth}
                            />
                        )}
                    </div>
                    }
                </div>

                {!isSession &&
                <div className="flex justify-center items-center flex-wrap w-2/4 mb-4">
                    <RouteButton
                        extraCSS={"mx-2"}
                        onClick={() =>
                            router.visit(
                                route("routines.start", data.routine.id)
                            )
                        }
                        title={t("routine_show_start_routine")}
                    ></RouteButton>
                    <RouteButton
                        extraCSS={"mx-2"}
                        onClick={() =>
                            router.visit(
                                route("routines.edit", data.routine.id)
                            )
                        }
                        title={t("routine_show_update_routine")}
                    ></RouteButton>
                </div>
                }
                {data.exercises.map(function (exercise, index) {
                    return (
                        <PrincipalTableShow
                            key={`${exercise.exercise.id}.${index}`}
                            index={index}
                        ></PrincipalTableShow>
                    );
                })}
            </div>
            <SubscriptionPopUp
                isOpen={isPopUpOpen}
                onClose={() => setIsPopUpOpen(false)}
            />
        </>
    );
}
