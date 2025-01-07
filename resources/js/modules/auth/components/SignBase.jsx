import { useEffect, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";
import { AnimatePresence, motion } from "motion/react";
import MainLayout from "@/shared/layouts/MainLayout";

export default function SignBase({ children, isSignIn }) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNavigation = (route) => {
        setIsAnimating(true);
        setTimeout(() => {
            router.visit(route);
        }, 500);
    };

    const variants = {
        hidden: {
            x:
                windowWidth > 1309
                    ? isSignIn
                        ? -windowWidth / 3.8
                        : windowWidth / 3.8
                    : isSignIn
                    ? -windowWidth / 2.6
                    : windowWidth / 2.6,
        },
        visible: { x: 0 },
        exit: { x: isSignIn ? -windowWidth / 3.8 : windowWidth / 3.8 },
    };

    const formVariants = {
        hidden: {
            opacity: 0,
            x: isSignIn ? windowWidth / 15 : -windowWidth / 15,
        },
        visible: { opacity: 1, x: 0 },
        exit: {
            opacity: 0,
            x: isSignIn ? windowWidth / 15 : -windowWidth / 15,
        },
    };

    return (
        <>
            <MainLayout>
                <div className="w-full h-[100vh] flex flex-row justify-center items-center">
                    <div className="w-[70vw] h-[65vh] glass relative custom-flex-wrap-first-title:w-[90vw] rounded-xl shadow-xl">
                        <AnimatePresence mode="wait">
                            {!isAnimating && (
                                <div
                                    key={isSignIn ? "login" : "register"}
                                    className="w-full relative h-full"
                                >
                                    {isSignIn ? (
                                        <>
                                            <motion.div
                                                variants={formVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                transition={{ duration: 1 }}
                                                className="w-2/3 h-full absolute flex items-center justify-center"
                                            >
                                                {children}
                                            </motion.div>
                                            <motion.div
                                                variants={variants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                transition={{ duration: 1 }}
                                                className="w-1/3 h-full absolute z-10 right-0 bg-lilaPrincipal rounded-xl"
                                            >
                                                <div className="flex flex-col justify-center items-center h-full p-4">
                                                    <p className="text-white text-responsive-td-table mb-4">
                                                        ¿No estás registrado?
                                                    </p>
                                                    <PrimaryButton
                                                        onClick={() =>
                                                            handleNavigation(
                                                                "/register"
                                                            )
                                                        }
                                                    >
                                                        Regístrate
                                                    </PrimaryButton>
                                                </div>
                                            </motion.div>
                                        </>
                                    ) : (
                                        <>
                                            <motion.div
                                                variants={variants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                transition={{ duration: 1 }}
                                                className="w-1/3 absolute z-10 h-full bg-lilaPrincipal rounded-xl"
                                            >
                                                <div className="flex flex-col justify-center items-center h-full p-4">
                                                    <p className="text-white text-responsive-td-table mb-4">
                                                        ¿Ya tienes cuenta?
                                                    </p>
                                                    <PrimaryButton
                                                        onClick={() =>
                                                            handleNavigation(
                                                                "/login"
                                                            )
                                                        }
                                                    >
                                                        Inicia Sesión
                                                    </PrimaryButton>
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                variants={formVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                transition={{ duration: 1 }}
                                                className="w-2/3 absolute flex items-center justify-center right-0 h-full"
                                            >
                                                {children}
                                            </motion.div>
                                        </>
                                    )}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}
