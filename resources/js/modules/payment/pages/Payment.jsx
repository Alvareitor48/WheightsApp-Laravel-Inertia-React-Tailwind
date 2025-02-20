import { useState } from "react";
import { m } from "motion/react";
import SimpleLayout from "@/shared/layouts/SimpleLayout";
import { useTranslation } from "@/shared/hooks/useTranslation";
import PayPalButton from "@/shared/components/PayPalButton.jsx";

export default function PaymentPage() {
    const t = useTranslation();

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
                        </div>
                        <div>
                            <h1>Pagar Pedido</h1>
                            <p>Total a pagar: 20 €</p>
                            <PayPalButton total={20}/>
                        </div>
                    </div>
                </m.div>
            </div>
        </SimpleLayout>
    );
}
