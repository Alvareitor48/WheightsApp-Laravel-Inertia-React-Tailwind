import SimpleLayout from "@/shared/layouts/SimpleLayout";
import { m } from "motion/react";
import InputLabel from "@/modules/auth/components/InputLabel";
import TextInput from "@/modules/auth/components/TextInput";
import InputError from "@/modules/auth/components/InputError";
import { useForm } from "@inertiajs/react";

export default function ProfileEditForm() {
    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <SimpleLayout>
            <div className="min-h-[88.4vh] bg-black text-white p-4 sm:p-6 flex items-center justify-center">
                <m.form
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 max-w-md"
                >
                    <div>
                        <InputLabel value="Contraseña Actual" />
                        <TextInput
                            id="current_password"
                            type="password"
                            name="current_password"
                            value={data.current_password}
                            className="block w-full"
                            isFocused={true}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.current_password}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel value="Nueva Contraseña" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full"
                            isFocused={true}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel value="Confirmacion Nueva Contraseña" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full"
                            isFocused={true}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <m.button
                        className="bg-lilaPrincipal pb-1 mt-28 w-full h-14 text-responsive-select rounded-xl"
                        whileHover={{ backgroundColor: "#8F3985", scale: 1.1 }}
                        type="submit"
                        disabled={processing}
                    >
                        Actualizar perfil
                    </m.button>
                </m.form>
            </div>
        </SimpleLayout>
    );
}
