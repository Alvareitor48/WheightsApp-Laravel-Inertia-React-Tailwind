import { m } from "motion/react";
import Model from "react-body-highlighter";
import { useState } from "react";
import { useDashboard } from "../contexts/dashboardContext";
import { router } from "@inertiajs/react";

const BodyHighlight = () => {
    const [isFront, setIsFront] = useState(true);
    const {
        setMainMuscle,
        setExercisesForMuscle,
        setMaxWeightsStats,
        setLoadingForMuscle,
        bodyHighLightData,
    } = useDashboard();
    const translateExercise = (muscle) => {
        switch (muscle) {
            case "trapezius":
                return "Espalda Alta y Trapecio";
            case "upper-back":
                return "Dorsales";
            case "lower-back":
                return "Espalda Baja";
            case "chest":
                return "Pecho";
            case "biceps":
                return "Bíceps";
            case "triceps":
                return "Tríceps";
            case "forearm":
                return "Antebrazos";
            case "back-deltoids":
                return "Deltoides Posterior";
            case "front-deltoids":
                return "Deltoides Frontal";
            case "abs":
                return "Abdominales";
            case "obliques":
                return "Oblicuos";
            case "adductor":
                return "Aductores";
            case "hamstring":
                return "Femoral";
            case "quadriceps":
                return "Cuádriceps";
            case "abductors":
                return "Abductores";
            case "calves":
                return "Gemelos";
            case "gluteal":
                return "Glúteo";
            default:
                return muscle;
        }
    };
    const handleClick = ({ muscle, data }) => {
        const { exercises, frequency } = data;

        /*alert(
                `You clicked the ${muscle}! You've worked out this muscle ${frequency} times through the following exercises: ${JSON.stringify(
                    exercises
                )}`
            );*/
        if (!(muscle === "head" || muscle === "neck" || muscle === "knees")) {
            setMainMuscle(muscle);
            setLoadingForMuscle(true);
            router.get(
                route("exercises.by.muscle", translateExercise(muscle)),
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ["exercisesForMuscle", "logsMaxWeights"],
                    onSuccess: (page) => {
                        setExercisesForMuscle(page.props.exercisesForMuscle);
                        console.log(page.props.logsMaxWeights);
                        setMaxWeightsStats(page.props.logsMaxWeights);
                        setLoadingForMuscle(false);
                    },
                }
            );
        }
    };
    return (
        <>
            <h2 className="text-responsive-h4 mb-4">
                Musculos entrenados esta semana
            </h2>
            <div className="flex justify-center relative items-center min-h-[200px] sm:min-h-[300px] md:min-h-[400px] xl:min-h-[500px]">
                {isFront ? (
                    <Model
                        data={bodyHighLightData}
                        style={{
                            margin: "3em",
                            minWidth: "100px",
                        }}
                        highlightedColors={[
                            "#FFE5E5",
                            "#FFB3B3",
                            "#FF6666",
                            "#FF1A1A",
                            "#990000",
                        ]}
                        onClick={handleClick}
                    />
                ) : (
                    <Model
                        data={bodyHighLightData}
                        style={{
                            margin: "3em",
                            minWidth: "100px",
                        }}
                        highlightedColors={[
                            "#FFE5E5",
                            "#FFB3B3",
                            "#FF6666",
                            "#FF1A1A",
                            "#990000",
                        ]}
                        type="posterior"
                        onClick={handleClick}
                    />
                )}
                <m.button
                    className="absolute bottom-0 right-0 bg-lilaPrincipal text-responsive-select p-2 rounded-lg"
                    onClick={() => setIsFront(!isFront)}
                    whileHover={{
                        backgroundColor: "#8F3985",
                        scale: 1.1,
                    }}
                >
                    Dar la vuelta
                </m.button>
            </div>
        </>
    );
};

export default BodyHighlight;
