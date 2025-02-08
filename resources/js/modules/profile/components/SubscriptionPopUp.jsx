import ReactDOM from "react-dom";
import { m } from "motion/react";

export function SubscriptionPopUp({ isOpen, onClose }) {
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
                    Acceso Premium Requerido
                </h2>
                <p className="text-responsive-p text-white/80 mb-6">
                    Para acceder a datos más detallados, como el historial de
                    tres meses o de un año, necesitas una suscripción premium.
                </p>
                <a className="bg-lilaPrincipal text-white px-4 py-2 rounded-md hover:bg-lilaSecundario block w-full text-center">
                    Suscribirse a Premium
                </a>
                <button
                    type="button"
                    className="mt-4 w-full text-white hover:text-gray-400"
                    onClick={(e) => {
                        e.preventDefault();
                        onClose();
                    }}
                >
                    Cerrar
                </button>
            </m.div>
        </div>,
        document.body
    );
}
