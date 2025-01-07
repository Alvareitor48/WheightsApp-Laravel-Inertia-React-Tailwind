import Checkbox from "@/modules/auth/components/Checkbox";
import InputError from "@/modules/auth/components/InputError";
import InputLabel from "@/modules/auth/components/InputLabel";
import PrimaryButton from "@/modules/auth/components/PrimaryButton";
import TextInput from "@/modules/auth/components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import SignBase from "@/modules/auth/components/SignBase";

export default function Login({ status, canResetPassword, isSignUpProp }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

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
                    <InputLabel forInput="email" value="Email" />
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
                    <InputLabel forInput="password" value="Contraseña" />
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
                            Recuerdame
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-white hover:text-gray-400"
                        >
                            Has olvidado tu contraseña?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" processing={processing}>
                        Iniciar Sesión
                    </PrimaryButton>
                </div>
            </form>
        </SignBase>
    );
    /*
    return (
        <>
            <Head title="Log in" />
            <div className="w-full h-[100vh] flex flex-row justify-center items-center">
                <div className="w-[50vw] h-[45vh] flex flex-row bg-red-500">
                    <AnimatePresence mode="wait">
                        {isSignUp ? (
                            <>
                                <div className="w-2/3 bg-green-500">
                                    <form
                                        onSubmit={submit}
                                        className="space-y-6 px-8 py-10"
                                    >
                                        <div>
                                            <InputLabel
                                                forInput="email"
                                                value="Email"
                                            />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="mt-1 block w-full"
                                                autoComplete="username"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.email}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                forInput="password"
                                                value="Password"
                                            />
                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full"
                                                autoComplete="current-password"
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.password}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="block">
                                            <label className="flex items-center">
                                                <Checkbox
                                                    name="remember"
                                                    value={data.remember}
                                                    onChange={(e) =>
                                                        setData(
                                                            "remember",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span className="ml-2 text-sm text-gray-600">
                                                    Remember me
                                                </span>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-end mt-4">
                                            {canResetPassword && (
                                                <Link
                                                    href={route(
                                                        "password.request"
                                                    )}
                                                    className="underline text-sm text-gray-600 hover:text-gray-900"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            )}

                                            <PrimaryButton
                                                className="ml-4"
                                                processing={processing}
                                            >
                                                Log in
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                                <div className="w-1/3 bg-blue-500">
                                    <div className="flex flex-col justify-center items-center h-full p-4">
                                        <p className="text-white mb-4">
                                            ¿No estás registrado?
                                        </p>
                                        <PrimaryButton
                                            onClick={() => setIsSignUp(false)}
                                        >
                                            Regístrate
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-1/3 bg-blue-500">
                                    <div className="flex flex-col justify-center items-center h-full p-4">
                                        <p className="text-white mb-4">
                                            ¿Ya tienes cuenta?
                                        </p>
                                        <PrimaryButton
                                            onClick={() => setIsSignUp(true)}
                                        >
                                            Inicia Sesión
                                        </PrimaryButton>
                                    </div>
                                </div>
                                <div className="w-2/3 bg-green-500">
                                    <form
                                        onSubmit={submit}
                                        className="space-y-6 px-8 py-10"
                                    >
                                        <div>
                                            <InputLabel
                                                forInput="name"
                                                value="Name"
                                            />
                                            <TextInput
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                className="mt-1 block w-full"
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                forInput="email"
                                                value="Email"
                                            />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="mt-1 block w-full"
                                                autoComplete="username"
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.email}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                forInput="password"
                                                value="Password"
                                            />
                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.password}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="flex items-center justify-end mt-4">
                                            <PrimaryButton
                                                className="ml-4"
                                                processing={processing}
                                            >
                                                Regístrate
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
    */
}
