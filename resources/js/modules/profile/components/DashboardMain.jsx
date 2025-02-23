import { useState } from "react";
import { m } from "motion/react";
import SimpleLayout from "@/shared/layouts/SimpleLayout";
import BodyHighlight from "../components/BodyHighlight";
import RoutinesCalendar from "../components/RoutinesCalendar";
import MaxWeights from "../components/MaxWeights";
import ExercisesForMuscle from "../components/ExercisesForMuscle";
import { useDashboard } from "../contexts/dashboardContext";
import {Link, router, usePage} from "@inertiajs/react";
import { PasswordPopUp } from "./PasswordPopUp";
import { useTranslation } from "@/shared/hooks/useTranslation";
export const DashboardMain = () => {
    const { calendarDay, sessions } = useDashboard();
    const [isOpen, setIsOpen] = useState(false);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const {auth} = usePage().props;

    const toggleDropdown = () => setIsOpen(!isOpen);
    const t = useTranslation();

    const handleRemoveAccount = () => {
        setIsPopUpOpen(true);
    };

    const confirmDeletion = (password, setError) => {
        router.delete(route("profile.destroy"), {
            data: { password },
            preserveScroll: true,
            onSuccess: () => {
                window.location.href = "/";
            },
            onError: (errors) => {
                if (errors.password) {
                    setError(errors.password);
                }
            },
        });
    };
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-black text-white p-4 sm:p-6"
        >
            <div className="mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:max-w-full xl:px-4">
                <m.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between gap-4 col-span-full"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-5 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="7" r="4" />
                                <path d="M12 11v4M12 15v4M8 15h8" />
                            </svg>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-semibold">
                            {auth.user.name}
                        </h1>
                    </div>
                    <div className="relative">
                        <m.button
                            onClick={toggleDropdown}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-white hover:text-gray-300 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                        </m.button>
                        {isOpen && (
                            <m.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-48 glass shadow-lg z-10"
                            >
                                <Link
                                    href={route("profile.edit")}
                                    className="block px-4 py-3 text-sm text-white hover:bg-lilaSecundario rounded-t-xl"
                                >
                                    {t("profile_edit")}
                                </Link>
                                <Link
                                    href={route("password.index")}
                                    className="block px-4 py-3 text-sm text-white hover:bg-lilaSecundario"
                                >
                                    {t("profile_change_password")}
                                </Link>
                                <button
                                    href="#"
                                    className="block w-full px-4 py-3 text-sm text-white hover:bg-lilaSecundario rounded-b-xl"
                                    type="button"
                                    onClick={handleRemoveAccount}
                                >
                                    {t("profile_delete_account")}
                                </button>
                            </m.div>
                        )}
                    </div>
                </m.div>
                <m.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 md:col-span-2 lg:col-span-1 lg:row-span-2"
                >
                    <BodyHighlight />
                </m.div>
                <m.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-2"
                >
                    <MaxWeights />
                </m.div>

                <m.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                >
                    <ExercisesForMuscle />
                </m.div>

                <m.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 relative"
                >
                    <RoutinesCalendar />
                    {calendarDay === "" ? (
                        <m.div className="rounded-lg bg-white/5 p-2">
                            <p className="text-center text-gray-400 text-responsive-select">
                                {t("dashboard_no_routine_day")}
                            </p>
                        </m.div>
                    ) : calendarDay === null ? (
                        <m.div className="rounded-lg bg-white/5 p-2">
                            <p className="text-center text-gray-400 text-responsive-select">
                                {t("dashboard_select_routine_day")}
                            </p>
                        </m.div>
                    ) : (
                        sessions
                            .filter((session) => session.date === calendarDay)
                            .map((session, index) => (
                                <m.div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-lg p-2 rounded-lg my-3 text-responsive-select"
                                >
                                    {session.name}
                                    <m.button
                                        className="mx-3 bg-lilaPrincipal p-2 rounded-lg text-responsive-select"
                                        whileHover={{
                                            scale: 1.1,
                                        }}
                                        onClick={() => router.get(route('routines.sessions.show', { sessionId: session.id }))}
                                    >
                                        {t("dashboard_view_day")}
                                    </m.button>
                                </m.div>
                            ))
                    )}
                </m.div>
            </div>
            <PasswordPopUp
                isOpen={isPopUpOpen}
                onClose={() => setIsPopUpOpen(false)}
                onConfirm={confirmDeletion}
            />
        </m.div>
    );
};
