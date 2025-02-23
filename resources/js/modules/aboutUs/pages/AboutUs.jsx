import MainLayout from "@/shared/layouts/MainLayout";
import { m } from "motion/react";
import FeatureCard from "../components/FeatureCard";
import { useTranslation } from "@/shared/hooks/useTranslation";

const AboutUs = () => {
    const t = useTranslation();
    return (
        <MainLayout>
            <main className="container mx-auto px-4 py-12">
                <m.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass p-8 mb-12"
                >
                    <h2 className="text-responsive-h2 font-semibold mb-4">
                        {t("about_title")}
                    </h2>
                    <p className="text-responsive-h4 text-white mb-6">
                        {t("about_description")}
                    </p>
                    <div className="flex items-center justify-center">
                        <svg
                            className="w-16 h-16 text-lilaPrincipal"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20 8H4C2.89543 8 2 8.89543 2 10V14C2 15.1046 2.89543 16 4 16H20C21.1046 16 22 15.1046 22 14V10C22 8.89543 21.1046 8 20 8Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6 8V16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M18 8V16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 12H22"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </m.section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <m.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass p-6"
                    >
                        <h3 className="text-responsive-h2 font-semibold mb-3">
                            {t("about_mission")}
                        </h3>
                        <p className="text-responsive-h4 text-white">
                            {t("about_mission_text")}
                        </p>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="glass p-6"
                    >
                        <h3 className="text-responsive-h2 font-semibold mb-3">
                            {t("about_vision")}
                        </h3>
                        <p className="text-responsive-h4 text-white">
                            {t("about_vision_text")}
                        </p>
                    </m.div>
                </div>

                <m.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12"
                >
                    <h2 className="text-responsive-h2 font-semibold mb-6">
                        {t("about_features")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={
                                <svg
                                    className="w-12 h-12 text-lilaPrincipal"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M19.4 15C19.1277 15.6171 19.0739 16.3081 19.2451 16.9634C19.4163 17.6188 19.8051 18.2031 20.35 18.62L20.41 18.68C20.8625 19.1313 21.1808 19.7087 21.3322 20.3375C21.4836 20.9664 21.4625 21.6254 21.2711 22.2432C21.0797 22.8609 20.7256 23.4149 20.2471 23.8445C19.7686 24.2742 19.1832 24.5643 18.56 24.69C17.9361 24.8161 17.2863 24.7719 16.6859 24.5626C16.0855 24.3533 15.5559 23.9865 15.15 23.5L15.09 23.44C14.6723 22.8963 14.0862 22.5101 13.4304 22.3407C12.7745 22.1712 12.0855 22.2286 11.4699 22.503C10.8543 22.7775 10.3456 23.2538 10.0234 23.8539C9.70119 24.4539 9.58162 25.1461 9.68999 25.82C9.80351 26.4813 10.1052 27.0931 10.5558 27.5785C11.0064 28.0639 11.5843 28.4006 12.22 28.54C12.8625 28.6875 13.5336 28.6251 14.1405 28.3621C14.7473 28.099 15.2604 27.6477 15.61 27.08"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.39999 6.32001C7.49103 5.82775 8.69516 5.65978 9.88095 5.83863C11.0667 6.01748 12.1844 6.53529 13.1 7.33001C13.9946 6.52975 15.1026 6.00645 16.2821 5.82372C17.4616 5.64099 18.6621 5.80674 19.75 6.30001"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            }
                            title={t("about_feature_routines")}
                            description={t("about_feature_routines_text")}
                        />
                        <FeatureCard
                            icon={
                                <svg
                                    className="w-12 h-12 text-lilaPrincipal"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            }
                            title={t("about_feature_tracking")}
                            description={t("about_feature_tracking_text")}
                        />
                        <FeatureCard
                            icon={
                                <svg
                                    className="w-12 h-12 text-lilaPrincipal"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            }
                            title={t("about_feature_progress")}
                            description={t("about_feature_progress_text")}
                        />
                    </div>
                </m.section>
            </main>
        </MainLayout>
    );
};

export default AboutUs;
