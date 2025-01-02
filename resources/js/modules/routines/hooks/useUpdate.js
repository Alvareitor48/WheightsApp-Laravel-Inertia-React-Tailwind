import { useRoutineForm } from '../contexts/RoutineFormContext';

export const useUpdate = () => {
    const {data,setData,errors} = useRoutineForm();
    const update = (newData, isExercise, attribute, principalIndex,seriesIndex) => {
        if(isExercise){
            const updatedExercises = [...data.exercises];
            if(!attribute.localeCompare('note')){
                updatedExercises[principalIndex].note = newData;
                setData("exercises", updatedExercises);
                return;
            }
            if(typeof newData === 'string' && !newData.localeCompare('Eliminar')){
                updatedExercises[principalIndex].series =
                updatedExercises[principalIndex].series.filter(
                    (serie, index) => index !== seriesIndex // Eliminar la serie con el índice especificado
                );
                setData("exercises", updatedExercises);
                return;
            }
            updatedExercises[principalIndex].series[seriesIndex][attribute] = newData;
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