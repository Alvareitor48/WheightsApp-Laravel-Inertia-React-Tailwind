import { usePage } from "@inertiajs/react";
import { useState } from "react";
export const usePremiumOrAdminCheck = () => {
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const { auth } = usePage().props;
    const isPremium = auth?.user?.roles?.some(
        (role) => role.name === "premium" || role.name === "admin"
    );
    return { isPopUpOpen, setIsPopUpOpen, isPremium };
};
