"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimpleLayout from "@/shared/layouts/SimpleLayout";

export default function WorkoutDashboard() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const statsRef = useRef(null);

    const stats = [
        { title: "Pecho", value: "120kg" },
        { title: "Espalda alta", value: "100kg" },
        { title: "Biceps", value: "40kg" },
        { title: "Triceps", value: "35kg" },
        { title: "Hombros", value: "60kg" },
        { title: "Piernas", value: "200kg" },
        { title: "Abdominales", value: "50 reps" },
    ];

    const scroll = (direction) => {
        if (statsRef.current) {
            const scrollAmount = 200;
            if (direction === "left") {
                statsRef.current.scrollLeft -= scrollAmount;
            } else {
                statsRef.current.scrollLeft += scrollAmount;
            }
            setScrollPosition(statsRef.current.scrollLeft);
        }
    };

    return (
        <SimpleLayout>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-black text-white p-4 sm:p-6"
            >
                <div className="mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:max-w-full xl:px-4">
                    {/* Header - spans full width */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4 mb-6 col-span-full"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center">
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
                    </motion.div>

                    {/* Muscle Visualization - spans 2 columns on larger screens */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-4 md:col-span-2 lg:col-span-1 lg:row-span-2"
                    >
                        <h2 className="text-lg mb-4">
                            Musculos entrenados esta semana
                        </h2>
                        <div className="flex justify-center items-center min-h-[200px] sm:min-h-[300px] md:min-h-[400px] xl:min-h-[500px]">
                            <div className="text-white/50 text-sm">
                                Visualización del cuerpo humano
                            </div>
                        </div>
                    </motion.div>

                    {/* Statistics */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-2"
                    >
                        <h2 className="text-lg mb-4">Estadísticas</h2>
                        <div className="relative">
                            <div className="overflow-hidden">
                                <motion.div
                                    ref={statsRef}
                                    className="grid grid-flow-col auto-cols-[150px] sm:auto-cols-[180px] md:auto-cols-[200px] lg:auto-cols-[220px] xl:auto-cols-[250px] gap-4 overflow-x-auto scrollbar-hide pb-4"
                                    style={{
                                        scrollBehavior: "smooth",
                                        WebkitOverflowScrolling: "touch",
                                    }}
                                >
                                    <AnimatePresence>
                                        {stats.map((stat, index) => (
                                            <motion.div
                                                key={stat.title}
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                transition={{
                                                    delay: index * 0.1,
                                                }}
                                                className="h-[100px] sm:h-[120px] md:h-[140px] lg:h-[160px] xl:h-[180px] bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center"
                                            >
                                                <h3 className="text-sm sm:text-base md:text-lg font-medium mb-2 sm:mb-3">
                                                    {stat.title}
                                                </h3>
                                                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                                                    {stat.value}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                            <button
                                onClick={() => scroll("left")}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
                                aria-label="Scroll left"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
                                aria-label="Scroll right"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </motion.div>

                    {/* Calendar */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-4"
                    >
                        <h2 className="text-lg mb-4">Calendario</h2>
                        <div className="aspect-[3/2] max-h-[200px] sm:max-h-[250px] md:max-h-[300px] lg:max-h-[350px] xl:max-h-[400px] bg-white/5 rounded-md flex items-center justify-center">
                            Calendario
                        </div>
                    </motion.div>

                    {/* Workouts */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-4"
                    >
                        <h2 className="text-lg mb-4">Mis entrenamientos</h2>
                        <div className="grid gap-4">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-white/5 border border-white/10 rounded-lg h-16 sm:h-20 md:h-24 flex items-center px-4"
                            >
                                <span className="text-sm sm:text-base md:text-lg">
                                    Entrenamiento 1
                                </span>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-white/5 border border-white/10 rounded-lg h-16 sm:h-20 md:h-24 flex items-center px-4"
                            >
                                <span className="text-sm sm:text-base md:text-lg">
                                    Entrenamiento 2
                                </span>
                            </motion.div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm sm:text-base md:text-lg"
                            >
                                Mostrar mas
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </SimpleLayout>
    );
}
