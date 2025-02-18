import { useState } from "react";
import { m } from "motion/react";
import SimpleLayout from "@/shared/layouts/SimpleLayout";
import BodyHighlight from "../components/BodyHighlight";
import RoutinesCalendar from "../components/RoutinesCalendar";
import MaxWeights from "../components/MaxWeights";
import ExercisesForMuscle from "../components/ExercisesForMuscle";
import { useDashboard } from "../contexts/dashboardContext";
import { Link } from "@inertiajs/react";
export const DashboardMain = () => {
    const { calendarDay, sessions } = useDashboard();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-black text-white p-4 sm:p-6"
        >
            <div className="mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:max-w-full xl:px-4">
                {/* Header - spans full width */}
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
                            Alvaro
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
                            <div className="absolute right-0 mt-2 w-48 glass shadow-lg z-10">
                                <Link
                                    href={route("profile.edit")}
                                    className="block px-4 py-3 text-sm text-white hover:bg-lilaSecundario rounded-t-xl"
                                >
                                    Editar perfil
                                </Link>
                                <Link
                                    href={route("password.index")}
                                    className="block px-4 py-3 text-sm text-white hover:bg-lilaSecundario"
                                >
                                    Cambiar contraseña
                                </Link>
                                <a
                                    href="#"
                                    className="block px-4 py-3 text-sm text-white hover:bg-lilaSecundario rounded-b-xl"
                                >
                                    Editar cuenta
                                </a>
                            </div>
                        )}
                    </div>
                </m.div>
                {/* Body Highlight */}
                <m.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 md:col-span-2 lg:col-span-1 lg:row-span-2"
                >
                    <BodyHighlight />
                </m.div>
                {/* Pesos maximos por musculo */}
                <m.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-2"
                >
                    <MaxWeights />
                </m.div>

                {/* Ejercicios por musculo */}
                <m.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                >
                    <ExercisesForMuscle />
                </m.div>

                {/* Calendario */}
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
                                Ese dia no tienes rutina
                            </p>
                        </m.div>
                    ) : calendarDay === null ? (
                        <m.div className="rounded-lg bg-white/5 p-2">
                            <p className="text-center text-gray-400 text-responsive-select">
                                Selecciona un día con rutina en el calendario
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
                                    >
                                        Ver dia
                                    </m.button>
                                </m.div>
                            ))
                    )}
                </m.div>
            </div>
        </m.div>
    );
};
