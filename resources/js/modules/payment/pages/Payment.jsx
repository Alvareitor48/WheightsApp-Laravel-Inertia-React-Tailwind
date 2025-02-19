import { useState } from "react";
import { m } from "motion/react";
import SimpleLayout from "@/shared/layouts/SimpleLayout";
import { useTranslation } from "@/shared/hooks/useTranslation";

export default function PaymentPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const t = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <SimpleLayout>
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-full max-w-md glassfull text-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">
                                {t("payment_title")}
                            </h2>
                            <p className="text-gray-400 mb-6">
                                {t("payment_description")}
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="cardNumber"
                                            className="block text-sm font-medium text-gray-300 mb-1"
                                        >
                                            Número de Tarjeta
                                        </label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            placeholder="1234 5678 9012 3456"
                                            required
                                            className="w-full px-3 py-2 bg-transparent text-white border border-lilaPrincipal rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="expiry"
                                                className="block text-sm font-medium text-gray-300 mb-1"
                                            >
                                                Fecha de Expiración
                                            </label>
                                            <input
                                                type="text"
                                                id="expiry"
                                                placeholder="MM / AA"
                                                required
                                                className="w-full px-3 py-2 bg-transparent text-white border border-lilaPrincipal rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="cvc"
                                                className="block text-sm font-medium text-gray-300 mb-1"
                                            >
                                                CVC
                                            </label>
                                            <input
                                                type="text"
                                                id="cvc"
                                                placeholder="123"
                                                required
                                                className="w-full px-3 py-2 bg-transparent text-white border border-lilaPrincipal rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-300 mb-1"
                                        >
                                            Nombre del Titular
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="John Doe"
                                            required
                                            className="w-full px-3 py-2 bg-transparent text-white border border-lilaPrincipal rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <m.button
                                        type="submit"
                                        className="w-full bg-lilaPrincipal text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        disabled={isProcessing}
                                        whileHover={{
                                            backgroundColor: "#8F3985",
                                            scale: 1.01,
                                        }}
                                    >
                                        {isProcessing ? (
                                            <m.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center justify-center"
                                            >
                                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                                {t("payment_processing")}
                                            </m.div>
                                        ) : (
                                            <m.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center justify-center"
                                            >
                                                {t("payment_pay_now")}
                                            </m.div>
                                        )}
                                    </m.button>
                                </div>
                            </form>
                        </div>
                    </div>
                </m.div>
            </div>
        </SimpleLayout>
    );
}
