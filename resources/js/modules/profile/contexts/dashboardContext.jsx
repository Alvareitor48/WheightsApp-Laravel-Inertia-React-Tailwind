import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children, sessions }) => {
    const [mainMuscle, setMainMuscle] = useState("");
    const [bodyHighlightData, setBodyHighlightData] = useState(null);
    const [maxWeightsStats, setMaxWeightsStats] = useState(null);
    const [exercisesForMuscle, setExercisesForMuscle] = useState(null);
    const [calendarDay, setCalendarDay] = useState("");
    return (
        <DashboardContext.Provider
            value={{
                mainMuscle,
                setMainMuscle,
                sessions,
                bodyHighlightData,
                setBodyHighlightData,
                maxWeightsStats,
                setMaxWeightsStats,
                exercisesForMuscle,
                setExercisesForMuscle,
                calendarDay,
                setCalendarDay,
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
