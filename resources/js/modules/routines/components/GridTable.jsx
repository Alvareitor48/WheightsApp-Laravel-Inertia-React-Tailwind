import {NumberInput} from "@/modules/routines/components/NumberInput.jsx";
import {SelectPopUp} from "@/modules/routines/components/SelectPopUp.jsx";
import {useState} from "react";
import { useUpdate } from '@/modules/routines/hooks/useUpdate';

export function GridTable({seriesIndex,principalIndex}) {
    const {update,data} = useUpdate()
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isPopup2Open, setPopup2Open] = useState(false);

    const handleInputChange = (attribute) => (newData) => {
        if (newData==='F'){
            update(1,true,'failure',principalIndex,seriesIndex)
            return
        }else if(attribute === 'RIR'){
            update(0,true,'failure',principalIndex,seriesIndex)
        }
        update(newData,true,attribute,principalIndex,seriesIndex)
    };

    const handleDelete = () => {
        update('Eliminar',true,'',principalIndex)
    }
    return (
        <>
        <tr className="border-b border-gray-200 hover:bg-lilaPrincipal">
            <td className="py-3 px-2 text-center whitespace-nowrap">
                <button
                    type="button"
                    className="bg-transparent text-responsive-td-table border border-none px-2 py-1 text-white"
                    onClick={(e) => {
                        e.preventDefault()
                        setPopup2Open(true)
                    }}
                >
                    {seriesIndex+1}
                </button>
            </td>
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
            options={["0","1", "2", "3", "4", "5", "F"]}
        />
            <SelectPopUp
                isOpen={isPopup2Open}
                onClose={() => setPopup2Open(false)}
                onSelect={handleDelete}
                options={["Eliminar"]}
            />
</>
)
}
