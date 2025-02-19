import { Head } from "@inertiajs/react";
import MainLayout from "@/shared/layouts/MainLayout.jsx";
import { FirstHomeMainContainer } from "@/modules/home/components/FirstHomeMainContainer.jsx";
import { MobileAndDesktopHomeContainer } from "@/modules/home/components/MobileAndDesktopHomeContainer.jsx";
import { useTranslation } from "@/shared/hooks/useTranslation";

export default function Home() {
    const t = useTranslation();
    return (
        <MainLayout>
            <Head title="Home" />
            <FirstHomeMainContainer></FirstHomeMainContainer>
            <MobileAndDesktopHomeContainer
                Imageorientation={"left"}
                title={t("mob_desk_1_title")}
                li={
                    <>
                        <li>
                            {t("mob_desk_1_li_1_part1")}{" "}
                            <span className="text-lilaPrincipal">
                                {t("mob_desk_1_li_1_highlight")}
                            </span>
                        </li>
                        <li>{t("mob_desk_1_li_2")}</li>
                        <li>
                            <span className="text-lilaPrincipal">
                                {t("mob_desk_1_li_3_highlight")}
                            </span>{" "}
                            {t("mob_desk_1_li_3_part2")}
                        </li>
                        <li>{t("mob_desk_1_li_4")}</li>
                        <li>
                            {t("mob_desk_1_li_5_part1")}{" "}
                            <span className="text-lilaPrincipal">
                                {t("mob_desk_1_li_5_highlight")}
                            </span>
                        </li>
                    </>
                }
            ></MobileAndDesktopHomeContainer>
            <MobileAndDesktopHomeContainer
                Imageorientation={"right"}
                title={t("mob_desk_2_title")}
                li={
                    <>
                        <li className="text-lilaPrincipal">
                            {t("mob_desk_2_li_1_highlight")}
                        </li>
                        <li>{t("mob_desk_2_li_2")}</li>
                        <li>
                            {t("mob_desk_2_li_3_part1")}{" "}
                            <span className="text-lilaPrincipal">
                                {t("mob_desk_2_li_3_highlight")}
                            </span>
                        </li>
                        <li>{t("mob_desk_2_li_4")}</li>
                        <li>
                            {t("mob_desk_2_li_5_part1")}{" "}
                            <span className="text-lilaPrincipal">
                                {t("mob_desk_2_li_5_highlight")}
                            </span>
                        </li>
                    </>
                }
            ></MobileAndDesktopHomeContainer>
        </MainLayout>
    );
}
