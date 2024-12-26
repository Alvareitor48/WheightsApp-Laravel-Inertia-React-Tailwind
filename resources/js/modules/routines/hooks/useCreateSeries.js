import { useRoutineForm } from '../contexts/RoutineFormContext';

export const useCreateSeries = () => {
    const { data, setData } = useRoutineForm();
    const createSeries = (index) => {
        const updatedExercises = [...data.exercises];
        const exerciseId = updatedExercises[index].data.id;
        const serie = {
            id: `temp-${exerciseId}-${updatedExercises[index].data.series[index].length}`,
            RIR: 0,
            repetitions: 0,
            weight: 0,
            duration: "00:00:00",
            failure: false,
        };
        updatedExercises[index].data.series[index].push(serie)
        setData("exercises", updatedExercises);
    }
    return { createSeries };
}