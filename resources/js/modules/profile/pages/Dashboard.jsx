import { useState } from "react";
import { m } from "motion/react";
import SimpleLayout from "@/shared/layouts/SimpleLayout";
import BodyHighlight from "../components/BodyHighlight";
export default function Dashboard() {
    const [mainMuscle, setMainMuscle] = useState("");
    const data = [
        {
            name: "Press Banca",
            muscles: ["chest", "triceps", "front-deltoids"],
            frequency: 4,
        },
        {
            name: "Crunch abdominal",
            muscles: ["abs"],
            frequency: 3,
        },
        {
            name: "Remo en T",
            muscles: ["upper-back", "biceps"],
            frequency: 8,
        },
    ];

    return (
        <SimpleLayout>
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
                        className="flex items-center gap-4 col-span-full"
                    >
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
                    </m.div>

                    {/* Body Highlight */}
                    <m.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-4 md:col-span-2 lg:col-span-1 lg:row-span-2"
                    >
                        <BodyHighlight
                            data={data}
                            setMainMuscle={setMainMuscle}
                        ></BodyHighlight>
                    </m.div>
                    {/* Pesos maximos por musculo */}
                    <m.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-2"
                    ></m.div>

                    {/* Ejercicios por musculo */}
                    <m.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-4"
                    ></m.div>

                    {/* Calendario */}
                    <m.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-4 relative"
                    ></m.div>
                </div>
            </m.div>
        </SimpleLayout>
    );
}
