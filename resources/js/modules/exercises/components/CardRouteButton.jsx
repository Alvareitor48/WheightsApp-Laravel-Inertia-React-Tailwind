import { m } from "motion/react";
export const CardRouteButton = ({ onClick, title }) => {
    return (
        <m.button
            type="button"
            className="bg-lilaPrincipal m-2 p-3 pt-1 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-note-table rounded-xl custom-flex-wrap-first-title:m-1 custom-flex-wrap-first-title:px-1"
            whileHover={{ backgroundColor: "#8F3985", scale: 1.1 }}
            onClick={onClick}
        >
            {title}
        </m.button>
    );
};
