import { usePage } from "@inertiajs/react";

export function Auth({ children, roles = [] }) {
    const { auth } = usePage().props;

    if (!auth.user) return null;

    if (roles.length > 0 && !roles.includes(auth.user.role)) return null;

    return <>{children}</>;
}
