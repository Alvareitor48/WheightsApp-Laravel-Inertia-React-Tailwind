import { router } from "@inertiajs/react";
import { useUpdate } from "@/modules/routines/hooks/useUpdate";
import { PrincipalTableShow } from "./PrincipalTableShow";
import { RouteButton } from "./RouteButton";
import Chart from "../components/Chart";
import { useEffect, useState } from "react";
import { usePremiumOrAdminCheck } from "@/shared/hooks/usePremiumOrAdminCheck";
import { SubscriptionPopUp } from "@/modules/profile/components/SubscriptionPopUp";
import { m } from "motion/react";

export default function RoutineShow({ stadistics }) {
    const { data } = useUpdate();
    const [chartHeight, setChartHeight] = useState(300); // Altura inicial
    const [chartWidth, setChartWidth] = useState(300); // Ancho inicial
    const [chartFilter, setChartFilter] = useState("month");
    const { isPopUpOpen, setIsPopUpOpen, isPremium } = usePremiumOrAdminCheck();
    const [loadingForChart, setLoadingForChart] = useState(false);
    const [filterStadistics, setFilterStadistics] = useState(stadistics);

    // Ajustar la altura del gráfico dinámicamente según el ancho de la pantalla
    useEffect(() => {
        const updateChartHeight = () => {
            const screenWidth = window.innerWidth;
            const newHeight = Math.max(200, screenWidth * 0.15); // Ejemplo: 40% del ancho
            const newWidth = Math.max(200, screenWidth * 0.6); // Ejemplo: 20% del ancho
            setChartHeight(newHeight);
            setChartWidth(newWidth);
        };

        // Calcular la altura al montar el componente
        updateChartHeight();

        // Escuchar cambios en el tamaño de la ventana
        window.addEventListener("resize", updateChartHeight);

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener("resize", updateChartHeight);
        };
    }, []);

    const fetchChart = (period) => {
        setLoadingForChart(true);
        router.get(
            route("routines.update.chart"),
            { period: period, routine_id: data.routine.id },
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
            window.open(
                route("routines.generate.pdf", { routineId: data.routine.id }),
                "_blank"
            );
        }
    };
    return (
        <>
            <div className="bg-transparent flex flex-col items-center min-h-screen text-white">
                {/* Título y usuario */}
                <div className="w-full flex justify-end p-4">
                    {/* Botón de Exportar PDF */}
                    <m.button
                        className="bg-lilaPrincipal text-white text-responsive-select py-1 px-2 rounded-md"
                        onClick={handleExportPDF}
                        whileHover={{ backgroundColor: "#8F3985", scale: 1.1 }}
                    >
                        Exportar PDF
                    </m.button>
                </div>

                <div className="text-center flex flex-col items-center justify-center mb-4 w-2/4">
                    <h1 className="text-responsive-h2 font-semibold break-all">
                        {data.routine.name}
                    </h1>
                    <p className="text-gray-400 text-responsive-h4 my-4 mx-8 break-all">
                        {data.routine.description}
                    </p>
                    <span className="text-gray-200 text-responsive-h4 font-semibold my-4">
                        Created by {data.routine.user.name}
                    </span>
                    <div className="w-full h-[40vh] flex flex-col justify-center items-center">
                        <select
                            value={chartFilter}
                            onChange={handleFilterChange}
                            className="p-2 rounded bg-black text-white border border-white"
                        >
                            <option value="month">Último mes</option>
                            <option value="3months">Últimos 3 meses</option>
                            <option value="year">Último año</option>
                        </select>
                        {loadingForChart ? (
                            <div>
                                <h4 className="text-responsive-h4 mb-4">
                                    Cargando ejercicios...
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
                </div>

                {/* Botón de Comenzar Rutina*/}
                <div className="flex justify-center items-center flex-wrap w-2/4 mb-4">
                    <RouteButton
                        extraCSS={"mx-2"}
                        onClick={() =>
                            router.visit(
                                route("routines.start", data.routine.id)
                            )
                        }
                        title="Comenzar Rutina"
                    ></RouteButton>
                    <RouteButton
                        extraCSS={"mx-2"}
                        onClick={() =>
                            router.visit(
                                route("routines.edit", data.routine.id)
                            )
                        }
                        title="Actualizar Rutina"
                    ></RouteButton>
                </div>
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
