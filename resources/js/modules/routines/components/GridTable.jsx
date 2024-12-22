import {useRoutineForm} from "@/modules/routines/contexts/RoutineFormContext.jsx";
import {NumberInput} from "@/modules/routines/components/NumberInput.jsx";
import {SelectPopUp} from "@/modules/routines/components/SelectPopUp.jsx";
import {useState} from "react";
export function GridTable({seriesIndex,principalIndex}) {
    const {data,setData} = useRoutineForm()
    const [isPopupOpen, setPopupOpen] = useState(false);
    const updateExercise = (attribute,newData) => {
        const updatedExercises = [...data.exercises];
        updatedExercises[principalIndex].data.series[principalIndex][seriesIndex][attribute] = newData;
        console.log(updatedExercises)
        setData("exercises", updatedExercises);
    };

    const handleInputChange = (attribute) => (newData) => {
        if (newData==='F'){
            updateExercise('failure',1)
            return
        }else if(attribute === 'RIR'){
            updateExercise('failure',0)
        }
        updateExercise(attribute, newData);
    };
    return (
        <>
        <tr className="border-b border-gray-200 hover:bg-lilaPrincipal">
            <td className="py-3 px-2 text-center whitespace-nowrap">{seriesIndex + 1}</td>
            <td className="py-3 px-2 text-center">
                <NumberInput onChange={handleInputChange("repetitions")}
                             value={data.exercises[principalIndex].data.series[principalIndex][seriesIndex]["repetitions"]}/>
            </td>
            <td className="py-3 px-2 text-center">
                <NumberInput onChange={handleInputChange("weight")}
                             value={data.exercises[principalIndex].data.series[principalIndex][seriesIndex]["weight"]}/>
            </td>
            <td className="py-3 px-2 text-center">
                <button
                    type="button"
                    className="bg-transparent text-responsive-td-table border border-none px-2 py-1 text-white"
                    onClick={(e) => {
                        e.preventDefault()
                        setPopupOpen(true)}}
                >
                    {data.exercises[principalIndex].data.series[principalIndex][seriesIndex].failure === 1 ?
                        'F':
                        data.exercises[principalIndex].data.series[principalIndex][seriesIndex].RIR
                    }
                </button>
            </td>
        </tr>
        <SelectPopUp
            isOpen={isPopupOpen}
            onClose={() => setPopupOpen(false)}
            onSelect={handleInputChange("RIR")}
        />
</>
)
}
