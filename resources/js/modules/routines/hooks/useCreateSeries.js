import { useRoutineForm } from "../contexts/RoutineFormContext";
import { v4 as uuidv4 } from "uuid";

export const useCreateSeries = () => {
    const { data, setData } = useRoutineForm();
    const createSeries = (index) => {
        const updatedExercises = [...data.exercises];
        const serie = {
            id: uuidv4(),
            RIR: 0,
            repetitions: 0,
            weight: 0,
            duration: "00:00:00",
            failure: false,
        };
        updatedExercises[index].series.push(serie);
        setData("exercises", updatedExercises);
    };
    return { createSeries };
};
