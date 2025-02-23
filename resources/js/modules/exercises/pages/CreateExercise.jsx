import MainLayout from "@/shared/layouts/MainLayout";
import {Head, useForm} from "@inertiajs/react";
import AutoResizingTextarea from "@/modules/routines/components/AutoResizingTextArea";
import { useTranslation } from "@/shared/hooks/useTranslation";

export default function CreateExercise({
    routineId,
    equipments,
    muscles,
    redirect_to,
}) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        media: null,
        equipment: "Otros",
        muscles: [],
    });

    const t = useTranslation();

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    const handleName = (e) => {
        setData("name", e.target.value);
    };
    const handleDescription = (e) => {
        setData("description", e.target.value);
    };

    const handleMusclesChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(
            (option) => option.value
        );
        setData("muscles", [...new Set([...data.muscles, ...selectedOptions])]);
    };

    const removeMuscle = (muscleToRemove) => {
        const newArray = data.muscles.filter(
            (muscle) => muscle !== muscleToRemove
        );
        setData("muscles", newArray);
    };

    const handleFileChange = (e) => {
        setData("media", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("media", data.media);
        formData.append("equipment", data.equipment);

        data.muscles.forEach((muscle, index) => {
            formData.append(`muscles[${index}]`, muscle);
        });

        post(
            route("routines.store.exercise", {
                routineId: routineId,
                redirect_to: redirect_to,
            }),
            formData
        );
    };

    return (
        <MainLayout>
            <Head title="Create Exercise" />
            <div className="min-h-screen bg-transparent text-white p-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-responsive-h1 font-bold mb-4">
                        {t("create_exercise_title")}
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-transparent p-6 rounded shadow-lg"
                    >
                        <div className="mb-4">
                            <label className="block text-white">
                                {t("create_exercise_name")}
                            </label>
                            <AutoResizingTextarea
                                name="name"
                                value={data.name}
                                onChange={handleName}
                                className="border bg-transparent border-gray-300 rounded-md text-white p-2 w-full"
                                required
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-white">
                                {t("create_exercise_description")}
                            </label>
                            <AutoResizingTextarea
                                name="description"
                                value={data.description}
                                onChange={handleDescription}
                                className="border bg-transparent border-gray-300 rounded-md text-white p-2 w-full"
                                required
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-white">
                                {t("create_exercise_upload")}
                            </label>
                            <input
                                type="file"
                                accept="image/webp, video/mp4"
                                onChange={handleFileChange}
                                className="border bg-transparent border-gray-300 rounded-md text-white p-2 w-full"
                                required
                            />
                            {errors.media && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.media}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-white">
                                {t("create_exercise_equipment")}
                            </label>
                            <select
                                name="equipment"
                                value={data.equipment}
                                onChange={handleChange}
                                className="border bg-transparent border-gray-300 rounded p-2 mt-1"
                            >
                                {equipments.map((equip, index) =>
                                    equip ? (
                                        <option key={index} value={equip}>
                                            {equip}
                                        </option>
                                    ) : null
                                )}
                                <option value={"Sin equipamiento"}>
                                    {t("exercises_filter_no_equipment")}
                                </option>
                            </select>
                        </div>

                        <div className="flex flex-col mt-4">
                            <label className="text-sm font-semibold text-white">
                                {t("create_exercise_muscles")}
                            </label>
                            <select
                                name="muscles"
                                multiple
                                value={data.muscles}
                                onChange={handleMusclesChange}
                                className="border border-gray-300 bg-transparent rounded p-2 mt-1"
                            >
                                {muscles.map((muscle, index) => (
                                    <option key={index} value={muscle}>
                                        {muscle}
                                    </option>
                                ))}
                            </select>
                            <div className="mt-2 text-sm text-white flex flex-wrap self-center gap-2">
                                {data.muscles.length > 0
                                    ? data.muscles.map((muscle, index) => (
                                          <span
                                              key={index}
                                              className="bg-blue-900 bg-opacity-70 text-white px-2 py-1 rounded-full text-responsive-note-table flex items-center gap-2"
                                          >
                                              {muscle}
                                              <button
                                                  type="button"
                                                  onClick={() =>
                                                      removeMuscle(muscle)
                                                  }
                                                  className="text-red-500 font-bold"
                                              >
                                                  ✖
                                              </button>
                                          </span>
                                      ))
                                    : t("create_exercise_no_muscles")}
                            </div>
                            {errors.muscles && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.muscles}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
                            disabled={processing}
                        >
                            {t("create_exercise_save")}
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
