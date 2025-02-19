import { NumberInput } from "@/modules/routines/components/NumberInput.jsx";
import { SelectPopUp } from "@/modules/routines/components/SelectPopUp.jsx";
import { useState } from "react";
import { useUpdate } from "@/modules/routines/hooks/useUpdate";
import { useSerieChecked } from "../contexts/SerieCheckedContext";
import { useTranslation } from "@/shared/hooks/useTranslation";

export function GridTableStart({ seriesIndex, principalIndex }) {
    const { update, data } = useUpdate();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isPopup2Open, setPopup2Open] = useState(false);
    const { completedSeries, toggleCompletion } = useSerieChecked();
    const t = useTranslation();

    const isCompleted =
        completedSeries[`${principalIndex}-${seriesIndex}`] || false;

    const handleInputChange = (attribute) => (newData) => {
        if (newData === "F") {
            update(1, true, "failure", principalIndex, seriesIndex);
            return;
        } else if (attribute === "RIR") {
            update(0, true, "failure", principalIndex, seriesIndex);
        }
        update(newData, true, attribute, principalIndex, seriesIndex);
    };

    const handleDelete = () => {
        update("Eliminar", true, "", principalIndex, seriesIndex);
    };

    const tds = [
        <button
            type="button"
            className="bg-transparent text-responsive-td-table border border-none px-2 py-1 text-white"
            onClick={(e) => {
                e.preventDefault();
                setPopup2Open(true);
            }}
        >
            {seriesIndex + 1}
        </button>,
        <NumberInput
            onChange={handleInputChange("repetitions")}
            value={
                data.exercises[principalIndex].series[seriesIndex][
                    "repetitions"
                ]
            }
            isStart={true}
        />,
        <NumberInput
            onChange={handleInputChange("weight")}
            value={data.exercises[principalIndex].series[seriesIndex]["weight"]}
            isStart={true}
        />,
        <button
            type="button"
            className="bg-transparent text-responsive-td-table border border-none px-2 py-1 text-white"
            onClick={(e) => {
                e.preventDefault();
                setPopupOpen(true);
            }}
        >
            {data.exercises[principalIndex].series[seriesIndex].failure === 1
                ? "F"
                : data.exercises[principalIndex].series[seriesIndex].RIR}
        </button>,
        <button
            type="button"
            onClick={() => toggleCompletion(principalIndex, seriesIndex)}
            className={`bg-transparent text-responsive-td-table px-2 py-1 rounded-full z-10 ${
                isCompleted
                    ? "text-gray-800 bg-green-300 outline outline-2 outline-gray-600"
                    : "text-white outline outline-2 outline-gray-600"
            }`}
        >
            {isCompleted ? "✔" : "✘"}
        </button>,
    ];
    return (
        <>
            <tr className="border-b border-gray-200 hover:bg-lilaPrincipal">
                {tds.map((td, index) => (
                    <td
                        key={index}
                        className={`py-3 px-2 text-center ${
                            isCompleted && "bg-green-700"
                        }`}
                    >
                        {td}
                    </td>
                ))}
            </tr>
            <SelectPopUp
                isOpen={isPopupOpen}
                onClose={() => setPopupOpen(false)}
                onSelect={handleInputChange("RIR")}
                options={["0", "1", "2", "3", "4", "5", "F"]}
            />
            <SelectPopUp
                isOpen={isPopup2Open}
                onClose={() => setPopup2Open(false)}
                onSelect={handleDelete}
                options={[t("select_pop_up_remove")]}
            />
        </>
    );
}
