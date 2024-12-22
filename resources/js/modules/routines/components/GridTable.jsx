import React from 'react';
import {useRoutineForm} from "@/modules/routines/contexts/RoutineFormContext.jsx";
import {NumberInput} from "@/modules/routines/components/NumberInput.jsx";
export function GridTable({seriesIndex,principalIndex}) {
    const {data,setData} = useRoutineForm()

    const updateExercise = (attribute,newData) => {
        const updatedExercises = [...data.exercises];
        updatedExercises[principalIndex].data.series[principalIndex][seriesIndex][attribute] = newData;
        console.log(updatedExercises)
        setData("exercises", updatedExercises);
    };

    const handleInputChange = (attribute) => (newData) => {
        updateExercise(attribute, newData);
    };
    return (
        <>
        <tr className="border-b border-gray-200 hover:bg-lilaPrincipal">
            <td className="py-3 px-2 text-center whitespace-nowrap">{seriesIndex + 1}</td>
            <td className="py-3 px-2 text-center">
                <NumberInput onChange = {handleInputChange("repetitions")} value={data.exercises[principalIndex].data.series[principalIndex][seriesIndex]["repetitions"]}/>
            </td>
            <td className="py-3 px-2 text-center">
                <NumberInput onChange={handleInputChange("weight")} value={data.exercises[principalIndex].data.series[principalIndex][seriesIndex]["weight"]}/>
            </td>
            <td className="py-3 px-2 text-center">
                <NumberInput onChange={handleInputChange("RIR")} value={data.exercises[principalIndex].data.series[principalIndex][seriesIndex]["RIR"]}/>
            </td>
        </tr>
        </>
    )
}
