import { usePage } from "@inertiajs/react";

export function Auth({ children }) {
    const { auth } = usePage().props;

    return auth.user ? <>{children}</> : null;
}
