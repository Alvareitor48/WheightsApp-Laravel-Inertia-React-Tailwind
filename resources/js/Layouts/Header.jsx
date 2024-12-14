import logo from '../assets/images/Logo.png';
import { Link } from "@inertiajs/react";
import HamburgerButton from "@/Components/HamburguerButton.jsx";

export const Header = () => {
    return (
        <header className="p-2 bg-black fixed flex justify-between items-center w-screen z-20">
            <Link href={route('home')}>
                <img className="h-11" src={logo} alt="Weights Technology Logo" draggable="false" />
            </Link>
            <HamburgerButton></HamburgerButton>
        </header>
    );
};
