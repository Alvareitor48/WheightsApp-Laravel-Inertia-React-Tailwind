import Checkbox from "@/modules/auth/components/Checkbox";
import InputError from "@/modules/auth/components/InputError";
import InputLabel from "@/modules/auth/components/InputLabel";
import PrimaryButton from "@/modules/auth/components/PrimaryButton";
import TextInput from "@/modules/auth/components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import SignBase from "@/modules/auth/components/SignBase";
import { useTranslation } from "@/shared/hooks/useTranslation";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const t = useTranslation();

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <SignBase isSignIn={true}>
            <Head title="Login" />

            <form onSubmit={submit} className="space-y-6 px-8 py-10">
                <div className="flex flex-col items-center justify-center">
                    <InputLabel value={t("login_email")} />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="flex flex-col items-center justify-center">
                    <InputLabel value={t("login_password")} />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            value={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ml-2 text-sm text-white">
                            {t("login_remember_me")}
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" processing={processing}>
                        {t("login_button")}
                    </PrimaryButton>
                </div>
            </form>
        </SignBase>
    );
}
