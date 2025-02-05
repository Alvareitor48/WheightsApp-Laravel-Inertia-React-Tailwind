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
