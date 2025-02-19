import SimpleLayout from "@/shared/layouts/SimpleLayout";
import { m } from "motion/react";
import InputError from "@/modules/auth/components/InputError";
import InputLabel from "@/modules/auth/components/InputLabel";
import TextInput from "@/modules/auth/components/TextInput";
import { useForm } from "@inertiajs/react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <SimpleLayout>
            <div className="min-h-[88.4vh] bg-black text-white p-4 sm:p-6 flex items-center justify-center">
                <m.form
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={submit}
                    className="space-y-4 max-w-md w-full"
                >
                    <div>
                        <h2 className="text-xl font-semibold text-center">
                            Confirmar Contraseña
                        </h2>
                        <p className="text-gray-300 text-sm text-center mt-2">
                            Esta es un área segura de la aplicación. Por favor,
                            confirma tu contraseña antes de continuar.
                        </p>
                    </div>

                    {/* Campo de Contraseña */}
                    <div>
                        <InputLabel htmlFor="password" value="Contraseña" />
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

                    {/* Botón de Confirmar */}
                    <m.button
                        className="bg-lilaPrincipal pb-1 mt-28 w-full h-14 text-responsive-select rounded-xl"
                        whileHover={{ backgroundColor: "#8F3985", scale: 1.1 }}
                        type="submit"
                        disabled={processing}
                    >
                        Confirmar
                    </m.button>
                </m.form>
            </div>
        </SimpleLayout>
    );
}
