import { router } from "@inertiajs/react";
import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({
    children,
    sessions,
    bodyHighLightData,
}) => {
    const [mainMuscle, setMainMuscle] = useState("");
    const [maxWeightsStats, setMaxWeightsStats] = useState([]);
    const [exercisesForMuscle, setExercisesForMuscle] = useState([]);
    const [calendarDay, setCalendarDay] = useState("");
    const [loadingForMuscle, setLoadingForMuscle] = useState(false);
    const [loadingForMuscle2, setLoadingForMuscle2] = useState(false);

    const [exerciseFilter, setExerciseFilter] = useState("week"); // "week", "month", "year"
    const [weightFilter, setWeightFilter] = useState("week"); // "week", "month", "year"

    const translateExercise = (muscle) => {
        switch (muscle) {
            case "trapezius":
                return "Espalda Alta y Trapecio";
            case "upper-back":
                return "Dorsales";
            case "lower-back":
                return "Espalda Baja";
            case "chest":
                return "Pecho";
            case "biceps":
                return "Bíceps";
            case "triceps":
                return "Tríceps";
            case "forearm":
                return "Antebrazos";
            case "back-deltoids":
                return "Deltoides Posterior";
            case "front-deltoids":
                return "Deltoides Frontal";
            case "abs":
                return "Abdominales";
            case "obliques":
                return "Oblicuos";
            case "adductor":
                return "Aductores";
            case "hamstring":
                return "Femoral";
            case "quadriceps":
                return "Cuádriceps";
            case "abductors":
                return "Abductores";
            case "calves":
                return "Gemelos";
            case "gluteal":
                return "Glúteo";
            default:
                return muscle;
        }
    };

    const fetchExercisesByMuscle = (muscle, period) => {
        setLoadingForMuscle(true);
        router.get(
            route("exercises.by.muscle", translateExercise(muscle)), // Solo enviamos el músculo en la URL
            { period }, // Enviamos el período como parámetro de consulta
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ["exercisesForMuscle"],
                onSuccess: (page) => {
                    setExercisesForMuscle(page.props.exercisesForMuscle);
                    setLoadingForMuscle(false);
                },
                onError: () => setLoadingForMuscle(false),
            }
        );
    };

    const fetchMaxWeightsByMuscle = (muscle, period) => {
        setLoadingForMuscle2(true);
        router.get(
            route("max.weights.by.muscle", translateExercise(muscle)), // Ahora usamos la nueva ruta
            { period }, // Enviamos el período como parámetro de consulta
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ["logsMaxWeights"],
                onSuccess: (page) => {
                    setMaxWeightsStats(page.props.logsMaxWeights);
                    setLoadingForMuscle2(false);
                },
                onError: () => setLoadingForMuscle(false),
            }
        );
    };
    return (
        <DashboardContext.Provider
            value={{
                mainMuscle,
                setMainMuscle,
                sessions,
                bodyHighLightData,
                maxWeightsStats,
                setMaxWeightsStats,
                exercisesForMuscle,
                setExercisesForMuscle,
                calendarDay,
                setCalendarDay,
                loadingForMuscle,
                setLoadingForMuscle,
                exerciseFilter,
                setExerciseFilter,
                weightFilter,
                setWeightFilter,
                fetchExercisesByMuscle,
                fetchMaxWeightsByMuscle,
                loadingForMuscle2,
                setLoadingForMuscle2,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboard debe usarse dentro de DashboardProvider");
    }
    return context;
};
