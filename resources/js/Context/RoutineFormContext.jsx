// RoutineFormContext.jsx
import React, { createContext, useContext, useState } from "react";
import { useForm } from "@inertiajs/react";

// Crear el contexto
const RoutineFormContext = createContext();

// Proveedor del contexto
export const RoutineFormProvider = ({ children, initialData }) => {
    const form = useForm(initialData);

    return (
        <RoutineFormContext.Provider value={form}>
            {children}
        </RoutineFormContext.Provider>
    );
};

// Hook para consumir el contexto
export const useRoutineForm = () => {
    const context = useContext(RoutineFormContext);
    if (!context) {
        throw new Error("useRoutineForm debe usarse dentro de RoutineFormProvider");
    }
    return context;
};
