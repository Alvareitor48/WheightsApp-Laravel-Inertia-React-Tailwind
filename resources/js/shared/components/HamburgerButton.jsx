import { m } from "motion/react";
const HamburgerButton = ({ action, isOpen }) => {
    return (
        <div
            className="bg-custom-gradient2 rounded-full p-2 w-10 h-10 cursor-pointer z-40"
            onClick={action}
        >
            <div className="flex flex-col justify-center items-center space-y-1 w-6">
                <m.div
                    className="h-1 w-full bg-black rounded"
                    animate={{
                        rotate: isOpen ? 45 : 0,
                        y: isOpen ? 8 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                />
                <m.div
                    className="h-1 w-full bg-black rounded"
                    animate={{
                        opacity: isOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                />
                <m.div
                    className="h-1 w-full bg-black rounded"
                    animate={{
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? -8 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                />
            </div>
        </div>
    );
};

export default HamburgerButton;
