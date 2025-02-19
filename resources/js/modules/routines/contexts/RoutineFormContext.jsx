import { createContext, useContext } from "react";
import { useForm } from "@inertiajs/react";

const RoutineFormContext = createContext();

export const RoutineFormProvider = ({ children, initialData }) => {
    const form = useForm(initialData);

    return (
        <RoutineFormContext.Provider value={form}>
            {children}
        </RoutineFormContext.Provider>
    );
};

export const useRoutineForm = () => {
    const context = useContext(RoutineFormContext);
    if (!context) {
        throw new Error(
            "useRoutineForm debe usarse dentro de RoutineFormProvider"
        );
    }
    return context;
};
