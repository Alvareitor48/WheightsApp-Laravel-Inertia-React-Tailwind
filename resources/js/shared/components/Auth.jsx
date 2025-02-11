import { usePage } from "@inertiajs/react";

export function Auth({ children, roles = [] }) {
    const { auth } = usePage().props;

    if (!auth.user) return null;

    const hasRequiredRole =
        roles.length === 0 ||
        auth.user.roles.some((role) => roles.includes(role.name));

    if (!hasRequiredRole) return null;

    return <>{children}</>;
}
