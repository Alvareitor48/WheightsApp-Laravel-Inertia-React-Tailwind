import { useState, useCallback } from "react";

export const useIconAnimation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return { isOpen, toggleMenu };
};
