import { useRoutineForm } from '../contexts/RoutineFormContext';

export const useUpdate = () => {
    const {data,setData,errors} = useRoutineForm();
    const update = (newData, isExercise, attribute, principalIndex,seriesIndex) => {
        if(isExercise){
            const updatedExercises = [...data.exercises];
            if(!attribute.localeCompare('note')){
                updatedExercises[principalIndex].data.note = newData;
                setData("exercises", updatedExercises);
                return;
            }
            if(typeof newData === 'string' && !newData.localeCompare('Eliminar')){
                updatedExercises[principalIndex].data.series[principalIndex] =
                updatedExercises[principalIndex].data.series[principalIndex].filter(
                    (serie, index) => index !== seriesIndex // Eliminar la serie con el índice especificado
                );
                setData("exercises", updatedExercises);
                return;
            }
            updatedExercises[principalIndex].data.series[principalIndex][seriesIndex][attribute] = newData;
            setData("exercises", updatedExercises);
            
        }else{
            setData('routine', {
                ...data.routine,
                [attribute]: newData
            });
        }
    }
    return {data,update,errors};
};