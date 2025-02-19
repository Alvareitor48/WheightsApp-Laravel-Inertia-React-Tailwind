import logo from "@/shared/assets/images/Logo.png";
import avatar from "@/shared/assets/images/avatar.png";
import { Link } from "@inertiajs/react";
import { useIconAnimation } from "@/shared/hooks/useIconAnimation.js";
import { m } from "motion/react";
import HamburgerButton from "@/shared/components/HamburgerButton.jsx";
import { Guest } from "./Guest";
import { Auth } from "./Auth";
import { useTranslation } from "../hooks/useTranslation";

export const Header = () => {
    const { isOpen, toggleMenu } = useIconAnimation();
    const t = useTranslation();

    return (
        <header className="p-2 bg-black fixed flex justify-between items-center w-screen z-20">
            <Link href={route("home")}>
                <img
                    className="h-11"
                    src={logo}
                    alt="Weights Technology Logo"
                    draggable="false"
                />
            </Link>
            <HamburgerButton action={toggleMenu} isOpen={isOpen} />
            {isOpen && (
                <m.div
                    className="absolute flex flex-col top-0 right-0 h-screen w-[230px] glassTintWORadius z-20 pt-24"
                    initial={{ width: 0 }}
                    animate={{ width: "250px" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <div className="flex flex-row items-center justify-center space-x-4 mb-6">
                        <img
                            src={avatar}
                            alt="Avatar"
                            className="w-20 rounded-full"
                            title="Avatar"
                            draggable="false"
                        />
                    </div>
                    <Guest>
                        <Link
                            href={route("login")}
                            className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                        >
                            {t("header_login")}
                        </Link>
                        <Link
                            href={route("register")}
                            className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                        >
                            {t("header_register")}
                        </Link>
                    </Guest>
                    <Auth>
                        <Link
                            href={route("dashboard")}
                            className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                        >
                            {t("header_dashboard")}
                        </Link>
                        <Link
                            href={route("routines.index")}
                            className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                        >
                            {t("header_my_routines")}
                        </Link>
                    </Auth>

                    <Link
                        href={route("exercises.index")}
                        className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                    >
                        {t("header_tutorials")}
                    </Link>
                    <Link
                        href={route("home")}
                        className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                    >
                        {t("header_find_routine")}
                    </Link>
                    <Link
                        href={route("home")}
                        className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                    >
                        {t("header_calculate_1rm")}
                    </Link>
                    <Link
                        href={route("home")}
                        className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                    >
                        {t("header_calculate_calories")}
                    </Link>
                    <Link
                        href={route("home")}
                        className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                    >
                        {t("header_about_us")}
                    </Link>
                    <Auth>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                        >
                            {t("header_logout")}
                        </Link>
                    </Auth>
                </m.div>
            )}
        </header>
    );
};
