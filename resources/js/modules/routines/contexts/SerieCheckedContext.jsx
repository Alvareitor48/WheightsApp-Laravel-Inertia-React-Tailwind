import { createContext, useContext, useState } from "react";

const SerieCheckedContext = createContext();

export const SerieCheckedProvider = ({ children }) => {
    const [completedSeries, setCompletedSeries] = useState({});

    const toggleCompletion = (principalIndex, seriesIndex) => {
        const seriesKey = `${principalIndex}-${seriesIndex}`;
        setCompletedSeries((previousState) => {
            const newState = { ...previousState };
            newState[seriesKey] = !newState[seriesKey];
            localStorage.setItem("seriesCompletion", JSON.stringify(newState));
            return newState;
        });
    };

    const areExerciseSeriesCompleted = (exerciseIndex, seriesCount) => {
        const completedCount = Object.keys(completedSeries).filter(
            (key) => key.startsWith(`${exerciseIndex}-`) && completedSeries[key]
        ).length;
        return completedCount === seriesCount;
    };

    return (
        <SerieCheckedContext.Provider
            value={{
                completedSeries,
                toggleCompletion,
                areExerciseSeriesCompleted,
                setCompletedSeries,
            }}
        >
            {children}
        </SerieCheckedContext.Provider>
    );
};

// Hook para consumir el contexto
export const useSerieChecked = () => {
    const context = useContext(SerieCheckedContext);
    if (!context) {
        throw new Error(
            "useSerieChecked debe usarse dentro de SerieCheckedProvider"
        );
    }
    return context;
};
