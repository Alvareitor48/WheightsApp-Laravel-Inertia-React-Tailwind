import SimpleLayout from "@/shared/layouts/SimpleLayout";
import { m } from "motion/react";
import InputLabel from "@/modules/auth/components/InputLabel";
import TextInput from "@/modules/auth/components/TextInput";
import InputError from "@/modules/auth/components/InputError";
import {Head, useForm, usePage} from "@inertiajs/react";
import { useTranslation } from "@/shared/hooks/useTranslation";

export default function ProfileEditForm() {
    const { auth } = usePage().props;
    const { data, setData, patch, processing, errors } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        weight: auth.user.weight,
        height: auth.user.height,
        gender: auth.user.gender,
        birthdate: auth.user.birthdate,
    });

    const t = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <SimpleLayout>
            <Head title="Edit Profile" />
            <div className="min-h-[88.4vh] bg-black text-white p-4 sm:p-6 flex items-center justify-center">
                <m.form
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 max-w-md"
                >
                    <div>
                        <InputLabel value={t("profile_edit_name")} />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="block w-full"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel value={t("profile_edit_email")} />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel value={t("profile_edit_weight")} />
                        <TextInput
                            id="weight"
                            type="number"
                            name="weight"
                            value={data.weight}
                            className="block w-full"
                            isFocused={true}
                            onChange={(e) => setData("weight", e.target.value)}
                        />
                        <InputError message={errors.weight} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel value={t("profile_edit_height")} />
                        <TextInput
                            type="number"
                            id="height"
                            name="height"
                            value={data.height}
                            className="block w-full"
                            isFocused={true}
                            onChange={(e) => setData("height", e.target.value)}
                        />
                        <InputError message={errors.height} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel value={t("profile_edit_gender")} />
                        <select
                            id="gender"
                            name="gender"
                            value={data.gender}
                            onChange={(e) => setData("gender", e.target.value)}
                            className="block w-full rounded-md h-[4vh] border-lilaPrincipal bg-transparent shadow-sm focus:border-lilaPrincipal focus:ring-lilaPrincipal"
                        >
                            <option value="">
                                {t("profile_edit_gender_select")}
                            </option>
                            <option value="male">
                                {t("profile_edit_gender_male")}
                            </option>
                            <option value="female">
                                {t("profile_edit_gender_female")}
                            </option>
                        </select>
                        <InputError message={errors.gender} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel value={t("profile_edit_birthdate")} />
                        <TextInput
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            value={data.birthdate}
                            className="block w-full"
                            isFocused={true}
                            onChange={(e) =>
                                setData("birthdate", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.birthdate}
                            className="mt-2"
                        />
                    </div>
                    <m.button
                        className="bg-lilaPrincipal pb-1 mt-28 w-full h-14 text-responsive-select rounded-xl"
                        whileHover={{ backgroundColor: "#8F3985", scale: 1.1 }}
                        type="submit"
                        disabled={processing}
                    >
                        {t("profile_edit_update_button")}
                    </m.button>
                </m.form>
            </div>
        </SimpleLayout>
    );
}
