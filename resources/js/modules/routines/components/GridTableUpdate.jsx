import { NumberInput } from "@/modules/routines/components/NumberInput.jsx";
import { SelectPopUp } from "@/modules/routines/components/SelectPopUp.jsx";
import { useState } from "react";
import { useUpdate } from "@/modules/routines/hooks/useUpdate";
import { GridTableBase } from "./GridTableBase";

export function GridTableUpdate({ seriesIndex, principalIndex }) {
    const { update, data } = useUpdate();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isPopup2Open, setPopup2Open] = useState(false);

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
        />,
        <NumberInput
            onChange={handleInputChange("weight")}
            value={data.exercises[principalIndex].series[seriesIndex]["weight"]}
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
    ];
    return (
        <>
            <GridTableBase tds={tds}></GridTableBase>
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
                options={["Eliminar"]}
            />
        </>
    );
}
