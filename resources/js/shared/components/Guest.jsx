import { usePage } from "@inertiajs/react";

export function Guest({ children }) {
    const { auth } = usePage().props;

    return !auth.user ? <>{children}</> : null;
}
