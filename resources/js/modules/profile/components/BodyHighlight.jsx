import { m } from "motion/react";
import Model from "react-body-highlighter";
import { useState } from "react";
import { useDashboard } from "../contexts/dashboardContext";

const BodyHighlight = ({ data }) => {
    const [isFront, setIsFront] = useState(true);
    const { setMainMuscle } = useDashboard();
    const handleClick = ({ muscle, data }) => {
        const { exercises, frequency } = data;

        /*alert(
                `You clicked the ${muscle}! You've worked out this muscle ${frequency} times through the following exercises: ${JSON.stringify(
                    exercises
                )}`
            );*/
        if (!(muscle === "head" || muscle === "neck" || muscle === "knees")) {
            setMainMuscle(muscle);
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
                        data={data}
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
                        data={data}
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
