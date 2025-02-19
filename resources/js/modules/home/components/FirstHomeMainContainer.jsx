import newHome from "@/modules/home/assets/images/newHome.png";
import { m } from "motion/react";
import { router, usePage } from "@inertiajs/react";
import { useTranslation } from "@/shared/hooks/useTranslation";
export const FirstHomeMainContainer = () => {
    const { locale } = usePage().props;
    const changeLanguage = (lang) => {
        router.get(
            route("setLocale", lang),
            {},
            {
                preserveState: true,
                only: ["locale", "translations"],
            }
        );
    };
    const t = useTranslation();
    return (
        <>
            <div>
                <a
                    onClick={() => changeLanguage("en")}
                    className={locale === "en" ? "active" : ""}
                >
                    English
                </a>{" "}
                |
                <a
                    onClick={() => changeLanguage("es")}
                    className={locale === "es" ? "active" : ""}
                >
                    Español
                </a>
                <a
                    onClick={() => changeLanguage("fr")}
                    className={locale === "fr" ? "active" : ""}
                >
                    Français
                </a>
            </div>
            <div className="mt-8 pt-16 relative flex flex-wrap justify-around">
                <m.div
                    className="w-responsive-width text-start custom-flex-wrap-first-title:text-center"
                    initial={{ opacity: 0, x: "-100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-responsive-h1 inline-block text-start custom-flex-wrap-first-title:text-center">
                        {t("title_part1")}{" "}
                        <span className="text-lilaPrincipal">
                            {t("title_highlight")}
                        </span>{" "}
                        {t("title_part2")}{" "}
                    </h1>
                    <h4 className="text-responsive-h4 inline-block pt-8 text-start custom-flex-wrap-first-title:text-center">
                        {t("title_h2")}
                    </h4>
                </m.div>
                <m.div
                    className="m-2 relative py-8 w-responsive-width"
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img
                        className="opacity-70 mask-gradient h-responsive-height-first-image m-auto -my-20 custom-flex-wrap-first-title:my-0"
                        src={newHome}
                        alt="Healthy men"
                        draggable="false"
                    ></img>
                </m.div>
            </div>
        </>
    );
};
