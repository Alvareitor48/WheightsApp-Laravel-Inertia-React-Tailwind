import InputError from "@/modules/auth/components/InputError";
import InputLabel from "@/modules/auth/components/InputLabel";
import PrimaryButton from "@/modules/auth/components/PrimaryButton";
import TextInput from "@/modules/auth/components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import SignBase from "@/modules/auth/components/SignBase";
import { useTranslation } from "@/shared/hooks/useTranslation";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const t = useTranslation();

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <SignBase isSignIn={false}>
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-4 px-8 py-10">
                <div className="flex flex-col items-center justify-center">
                    <InputLabel value={t("register_name")} />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="flex flex-col items-center justify-center">
                    <InputLabel value={t("register_email")} />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="flex flex-col items-center justify-center">
                    <InputLabel value={t("register_password")} />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex flex-col items-center justify-center">
                    <InputLabel value={t("register_password_confirm")} />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-center mt-4">
                    <PrimaryButton processing={processing}>
                        {t("register_button")}
                    </PrimaryButton>
                </div>
            </form>
        </SignBase>
    );
}
