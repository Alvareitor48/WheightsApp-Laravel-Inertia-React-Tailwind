import logo from '@/shared/assets/images/Logo.png';
import avatar from '@/shared/assets/images/avatar.png';
import { Link } from "@inertiajs/react";
import { useIconAnimation } from "@/modules/home/hooks/useIconAnimation.js";
import {m} from "motion/react";
import HamburgerButton from "@/shared/components/HamburgerButton.jsx";

export const Header = () => {
    const { isOpen, toggleMenu } = useIconAnimation();

    return (
        <header className="p-2 bg-black fixed flex justify-between items-center w-screen z-20">
            <Link href={route('home')}>
                <img className="h-11" src={logo} alt="Weights Technology Logo" draggable="false" />
            </Link>
            <HamburgerButton action={toggleMenu} isOpen={isOpen} />
            {isOpen && (
                <m.div
                    className="absolute flex flex-col top-0 right-0 h-screen w-[230px] glassTintWORadius z-20 pt-24"
                    initial={{width: 0}}
                    animate={{width: '250px'}}
                    exit={{width: 0}}
                    transition={{duration: 0.3, ease: 'easeInOut'}}
                >
                    <div className="flex flex-row items-center justify-center space-x-4 mb-6">
                        <img src={avatar} alt="Avatar" className="w-20 rounded-full" title="Avatar" draggable="false"/>
                    </div>
                    <Link
                        href={route('login')}
                        className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                    >
                        Login
                    </Link>
                    <Link
                        href={route('register')}
                        className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                    >
                        Register
                    </Link>
                    <Link
                        href={route('home')}
                        className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                    >
                        Mi perfil
                    </Link>
                    <Link
                        href={route('IndexRoutines')}
                        className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                    >
                        Mis rutinas
                    </Link>
                    <Link
                        href={route('home')}
                        className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                    >
                        Tutoriales
                    </Link>
                    <Link
                        href={route('home')}
                        className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                    >
                        Encontrar rutina
                    </Link>
                    <Link
                        href={route('home')}
                        className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                    >
                        Calcular 1RM
                    </Link>
                    <Link
                        href={route('home')}
                        className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                    >
                        Calcular Calorias
                    </Link>
                    <Link
                        href={route('home')}
                        className="block my-2 px-4 py-2 text-white hover:bg-lilaSecundario"
                    >
                        Sobre Nosotros
                    </Link>
                </m.div>
            )}
        </header>
    );
};
