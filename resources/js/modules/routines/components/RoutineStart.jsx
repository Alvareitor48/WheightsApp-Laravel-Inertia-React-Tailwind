import { m } from "motion/react";
import { useRoutineForm } from "@/modules/routines/contexts/RoutineFormContext.jsx";
import { useUpdate } from "@/modules/routines/hooks/useUpdate";
import { PrincipalTableStart } from "./PrincipalTableStart";
import { useSerieChecked } from "../contexts/SerieCheckedContext";
import { useEffect, useRef, useState } from "react";

export default function RoutineStart() {
    const { put, processing, errors } = useRoutineForm();
    const { update, data } = useUpdate();
    const { setCompletedSeries, areExerciseSeriesCompleted } =
        useSerieChecked();
    const [exerciseErrors, setExerciseErrors] = useState({});
    const [timeElapsed, setTimeElapsed] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const savedProgress = localStorage.getItem("routineProgress");
        const savedStartTime = localStorage.getItem("startTime");

        if (savedProgress) {
            const parsedProgress = JSON.parse(savedProgress);
            update(parsedProgress.routine, false, null, null, null, true);
            update(parsedProgress.exercises, true, null, null, null, true);

            if (savedStartTime) {
                const elapsed = Math.floor(
                    (Date.now() - parseInt(savedStartTime, 10)) / 1000
                );
                setTimeElapsed(elapsed);
                update(elapsed, false, "durationInSeconds");
            }
        }

        const seriesCompletion = localStorage.getItem("seriesCompletion");
        if (seriesCompletion) {
            setCompletedSeries(JSON.parse(seriesCompletion));
        }

        if (!savedStartTime) {
            localStorage.setItem("startTime", Date.now());
        }

        intervalRef.current = setInterval(() => {
            const startTime = parseInt(localStorage.getItem("startTime"), 10);
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            setTimeElapsed(elapsed);
            update(elapsed, false, "durationInSeconds");

            const routineProgress = {
                routine: { ...data.routine, durationInSeconds: elapsed },
                exercises: data.exercises,
            };
            localStorage.setItem(
                "routineProgress",
                JSON.stringify(routineProgress)
            );
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);
    useEffect(() => {
        const routineProgress = {
            routine: data.routine,
            exercises: data.exercises,
        };
        localStorage.setItem(
            "routineProgress",
            JSON.stringify(routineProgress)
        );
    }, [data]);
    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        let allExercisesCompleted = true;

        data.exercises.forEach((exercise, index) => {
            const seriesCount = exercise.series.length;
            if (!areExerciseSeriesCompleted(index, seriesCount)) {
                newErrors[index] =
                    "Faltan series por completar en este ejercicio";
                allExercisesCompleted = false;
            }
        });

        setExerciseErrors(newErrors);

        if (!allExercisesCompleted) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        put(route("routines.start.session"), {
            routine: data.routine,
            exercises: data.exercises,
            onSuccess: () => {
                localStorage.removeItem("routineProgress");
                localStorage.removeItem("seriesCompletion");
                localStorage.removeItem("startTime");
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-transparent flex flex-col items-center min-h-screen text-white"
        >
            {/* Título y usuario */}
            <div className="text-center mb-4 flex flex-col items-center">
                <textarea
                    rows={1}
                    value={data.routine.name}
                    onChange={(e) => update(e.target.value, 0, "name")}
                    className="inline-block w-responsive-input text-responsive-h2 leading-normal font-semibold bg-black border-0 resize-none"
                    onInput={(e) => {
                        e.target.style.height = "auto"; // Resetea el alto
                        e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta al contenido
                    }}
                />
                {errors["routine.name"] && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors["routine.name"]}
                    </p>
                )}
                <p className="text-responsive-note-table">
                    Tiempo transcurrido: {Math.floor(timeElapsed / 60)}m{" "}
                    {timeElapsed % 60}s
                </p>
                <textarea
                    rows={1}
                    value={data.routine.description}
                    onChange={(e) => update(e.target.value, 0, "description")}
                    className="inline-block w-responsive-input text-gray-400 text-responsive-h4 leading-normal my-4 mx-8 bg-black border-0 resize-none"
                    onInput={(e) => {
                        e.target.style.height = "auto"; // Resetea el alto
                        e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta al contenido
                    }}
                />
                {errors["routine.description"] && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors["routine.description"]}
                    </p>
                )}
                <span className="text-gray-200 text-responsive-h4 font-semibold my-4">
                    Created by {data.routine.user.name}
                </span>
            </div>

            {data.exercises.map(function (exercise, index) {
                return (
                    <PrincipalTableStart
                        key={`${exercise.exercise.id}.${index}`}
                        index={index}
                        error={exerciseErrors[index]}
                    ></PrincipalTableStart>
                );
            })}
            <m.button
                className="bg-lilaPrincipal pb-1 mt-10 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-h4 rounded-xl"
                whileHover={{ backgroundColor: "#8F3985", scale: 1.1 }}
                type="submit"
                disabled={processing}
            >
                Terminar Rutina
            </m.button>
        </form>
    );
}
