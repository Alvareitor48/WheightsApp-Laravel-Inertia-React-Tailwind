import { useRoutineForm } from "../contexts/RoutineFormContext";

export const useUpdate = () => {
    const { data, setData, errors } = useRoutineForm();

    const saveProgressToLocalStorage = () => {
        const routineProgress = {
            routine: data.routine,
            exercises: data.exercises,
            seriesCompletion:
                JSON.parse(localStorage.getItem("seriesCompletion")) || {},
            startTime: localStorage.getItem("startTime"),
        };
        localStorage.setItem(
            "routineProgress",
            JSON.stringify(routineProgress)
        );
    };

    const update = (
        newData,
        isExercise,
        attribute,
        principalIndex = null,
        seriesIndex = null,
        isLocalStorageSet = false
    ) => {
        if (isLocalStorageSet) {
            if (isExercise) {
                setData("exercises", newData);
            } else {
                setData("routine", newData);
            }
            return;
        }

        if (isExercise) {
            const updatedExercises = [...data.exercises];
            if (!attribute.localeCompare("note")) {
                updatedExercises[principalIndex].note = newData;
                setData("exercises", updatedExercises);
                saveProgressToLocalStorage();
                return;
            }

            if (newData === "Eliminar") {
                updatedExercises[principalIndex].series = updatedExercises[
                    principalIndex
                ].series.filter((_, index) => index !== seriesIndex);
                setData("exercises", updatedExercises);

                setCompletedSeries((prevState) => {
                    const newState = { ...prevState };
                    const seriesKey = `${principalIndex}-${seriesIndex}`;
                    delete newState[seriesKey];
                    return newState;
                });

                saveProgressToLocalStorage();
                return;
            }
            updatedExercises[principalIndex].series[seriesIndex][attribute] =
                newData;
            setData("exercises", updatedExercises);
        } else {
            setData("routine", {
                ...data.routine,
                [attribute]: newData,
            });
        }
        saveProgressToLocalStorage();
    };
    return { data, update, errors, saveProgressToLocalStorage };
};
