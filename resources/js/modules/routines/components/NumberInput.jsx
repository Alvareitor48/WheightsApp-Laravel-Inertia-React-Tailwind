import { useState } from "react";

export function NumberInput({ onChange, value, isStart }) {
    const [isEmpty, setEmpty] = useState(true);
    return (
        <input
            type="text"
            className="p-0 bg-transparent text-responsive-td-table border-0 no-arrows w-responsive-mini-mini-input"
            value={isStart ? (isEmpty === true ? "" : value) : value}
            placeholder={isStart && value}
            onKeyDown={(e) => {
                const allowedKeys = [
                    "Backspace",
                    "Delete",
                    "Tab",
                    "ArrowLeft",
                    "ArrowRight",
                    ".",
                ];

                if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                    e.preventDefault();
                }

                if (e.key === "." && e.target.value.includes(".")) {
                    e.preventDefault();
                }
            }}
            onInput={(e) => {
                const value = e.target.value;

                if (/^\d+(\.\d{0,2})?$/.test(value)) {
                    e.target.value = value;
                } else {
                    e.target.value = value.slice(0, -1);
                }
            }}
            onChange={(e) => {
                setEmpty(false);
                onChange(e.target.value);
            }}
        />
    );
}
