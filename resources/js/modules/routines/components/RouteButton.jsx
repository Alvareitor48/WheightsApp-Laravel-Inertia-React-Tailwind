import { m } from "motion/react";
export const RouteButton = ({ onClick, title }) => {
    return (
        <m.button
            type="button"
            className="bg-lilaPrincipal pb-1 mt-10 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-h4 rounded-xl"
            whileHover={{ backgroundColor: "#8F3985", scale: 1.1 }}
            onClick={onClick}
        >
            {title}
        </m.button>
    );
};
