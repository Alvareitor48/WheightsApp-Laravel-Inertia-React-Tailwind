import { useTranslation } from "../hooks/useTranslation";

export const Footer = () => {
    const t = useTranslation();
    return (
        <footer>
            <div className="bg-lilaPrincipal p-2">
                <div className="mx-auto px-4 text-center">
                    <p className="text-white">
                        &copy; 2024 Weights Technology. {t("rights_reserved")}
                    </p>
                </div>
            </div>
        </footer>
    );
};
