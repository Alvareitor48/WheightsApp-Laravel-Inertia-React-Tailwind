import { router } from "@inertiajs/react";
import { useUpdate } from "@/modules/routines/hooks/useUpdate";
import { PrincipalTableShow } from "./PrincipalTableShow";
import { RouteButton } from "./RouteButton";
import Chart from "../components/Chart";
import { useEffect, useState } from "react";

export default function RoutineShow({ stadistics }) {
    const { data } = useUpdate();
    const [chartHeight, setChartHeight] = useState(300); // Altura inicial
    const [chartWidth, setChartWidth] = useState(300); // Ancho inicial

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
    return (
        <div className="bg-transparent flex flex-col items-center min-h-screen text-white">
            {/* Título y usuario */}
            <div className="text-center flex flex-col items-center justify-center mb-4 w-2/4">
                <h1 className="text-responsive-h2 font-semibold">
                    {data.routine.name}
                </h1>
                <p className="text-gray-400 text-responsive-h4 my-4 mx-8">
                    {data.routine.description}
                </p>
                <span className="text-gray-200 text-responsive-h4 font-semibold my-4">
                    Created by {data.routine.user.name}
                </span>
                <div className="w-full h-[40vh] flex justify-center items-center">
                    <Chart
                        data={stadistics}
                        height={chartHeight}
                        width={chartWidth}
                    />
                </div>
            </div>

            {/* Botón de Comenzar Rutina*/}
            <div className="flex justify-center items-center flex-wrap w-2/4 mb-4">
                <RouteButton
                    extraCSS={"mx-2"}
                    onClick={() =>
                        router.visit(route("routines.start", data.routine.id))
                    }
                    title="Comenzar Rutina"
                ></RouteButton>
                <RouteButton
                    extraCSS={"mx-2"}
                    onClick={() =>
                        router.visit(route("routines.edit", data.routine.id))
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
    );
}
