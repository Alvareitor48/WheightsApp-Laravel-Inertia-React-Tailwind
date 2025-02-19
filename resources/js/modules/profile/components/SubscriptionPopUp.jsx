import ReactDOM from "react-dom";
import { m } from "motion/react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "@/shared/hooks/useTranslation";

export function SubscriptionPopUp({ isOpen, onClose }) {
    const t = useTranslation();
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <m.div
                className="bg-black rounded-lg p-6 w-responsive-popup text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                <h2 className="text-responsive-h3 text-white mb-4">
                    {t("subscription_popup_title")}
                </h2>
                <p className="text-responsive-p text-white/80 mb-6">
                    {t("subscription_popup_message")}
                </p>
                <Link
                    href={route("payments.index")}
                    className="bg-lilaPrincipal text-white px-4 py-2 rounded-md hover:bg-lilaSecundario block w-full text-center"
                >
                    {t("subscription_popup_subscribe")}
                </Link>
                <button
                    type="button"
                    className="mt-4 w-full text-white hover:text-gray-400"
                    onClick={(e) => {
                        e.preventDefault();
                        onClose();
                    }}
                >
                    {t("subscription_popup_close")}
                </button>
            </m.div>
        </div>,
        document.body
    );
}
