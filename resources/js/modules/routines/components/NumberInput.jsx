import React from 'react';
export function NumberInput({onChange,value}) {
    return (
        <input
            type="text" // Cambiamos a "text" para mayor control
            className="p-0 bg-transparent text-responsive-td-table border-0 no-arrows w-responsive-mini-mini-input"
            value={value}
            onKeyDown={(e) => {
                const allowedKeys = [
                    "Backspace",
                    "Delete",
                    "Tab",
                    "ArrowLeft",
                    "ArrowRight",
                    ".",
                ];

                // Permitir solo números, punto, y teclas especiales
                if (
                    !/[0-9]/.test(e.key) &&
                    !allowedKeys.includes(e.key)
                ) {
                    e.preventDefault();
                }

                // Restringir más de un punto
                if (e.key === "." && e.target.value.includes(".")) {
                    e.preventDefault();
                }
            }}

            onInput={(e) => {
                const value = e.target.value;

                // Validar formato: máximo 2 decimales
                if (/^\d+(\.\d{0,2})?$/.test(value)) {
                    e.target.value = value;
                } else {
                    e.target.value = value.slice(0, -1); // Remover el último carácter no válido
                }
            }}

            onChange={(e)=>onChange(e.target.value)}
        />
    )
        ;
}
