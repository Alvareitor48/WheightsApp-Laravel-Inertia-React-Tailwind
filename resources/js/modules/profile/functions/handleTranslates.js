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
const translateFilter = (filter) => {
    switch (filter) {
        case "month":
            return "Último mes";
        case "3months":
            return "Últimos 3 meses";
        case "year":
            return "Último año";
        default:
            return filter;
    }
};

export default { translateExercise, translateFilter };
