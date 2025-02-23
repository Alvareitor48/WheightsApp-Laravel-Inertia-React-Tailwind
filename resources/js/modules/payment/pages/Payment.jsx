import { useState } from "react";
import { m } from "motion/react";
import SimpleLayout from "@/shared/layouts/SimpleLayout";
import { useTranslation } from "@/shared/hooks/useTranslation";
import PayPalButton from "@/modules/payment/components/PayPalButton.jsx";
import {Head} from "@inertiajs/react";

export default function PaymentPage() {
    const t = useTranslation();

    return (
        <SimpleLayout>
            <Head title="Payment" />
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-full max-w-md glassfull text-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">
                                {t("new_payment_title")}
                            </h2>
                            <p className="text-gray-400 mb-6">
                                {t("new_payment_description")}
                            </p>
                            <div className="mb-8">
                                <span className="text-4xl font-bold">
                                    {t("new_payment_price")}
                                </span>
                                <span className="text-gray-400">
                                    {" "}
                                    {t("new_payment_price_note")}
                                </span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {[
                                    {
                                        icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                                        text: t(
                                            "new_payment_features_calendar"
                                        ),
                                    },
                                    {
                                        icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
                                        text: t(
                                            "new_payment_features_training_view"
                                        ),
                                    },
                                    {
                                        icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
                                        text: t(
                                            "new_payment_features_max_weights"
                                        ),
                                    },
                                    {
                                        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                                        text: t("new_payment_features_stats"),
                                    },
                                    {
                                        icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                                        text: t(
                                            "new_payment_features_custom_exercises"
                                        ),
                                    },
                                ].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-3 text-green-500"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d={item.icon}></path>
                                        </svg>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="pb-8 px-2">
                            <PayPalButton/>
                        </div>
                    </div>
                </m.div>
            </div>
        </SimpleLayout>
    );
}
