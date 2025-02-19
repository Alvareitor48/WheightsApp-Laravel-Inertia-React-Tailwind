import { usePage } from "@inertiajs/react";

export function useTranslation() {
    const { translations } = usePage().props;

    const t = (key) => translations[key] || key;

    return t;
}
