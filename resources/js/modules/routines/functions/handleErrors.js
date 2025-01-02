export const handleErrors = (index, errors) => {
    const errorsArray = Object.keys(errors).map(key => ({ [key]: errors[key] }));
    const repetitionsErrors = errorsArray.filter(error => {
        const errorKey = Object.keys(error)[0];
        return errorKey.startsWith(`exercises.${index}.series`) && errorKey.endsWith('.repetitions');
    });
    const weightErrors = errorsArray.filter(error => {
        const errorKey = Object.keys(error)[0];
        return errorKey.startsWith(`exercises.${index}.series`) && errorKey.endsWith('.weight');
    });

    if (repetitionsErrors.length > 0 && weightErrors.length > 0) {
        return 'both';
    } else if (repetitionsErrors.length > 0) {
        return 'repetitions';
    } else if (weightErrors.length > 0) {
        return 'weight';
    } else {
        return null;
    }
};