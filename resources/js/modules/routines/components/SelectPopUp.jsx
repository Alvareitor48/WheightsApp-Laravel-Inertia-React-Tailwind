import ReactDOM from "react-dom";
import {m} from "motion/react";
export function SelectPopUp({ isOpen, onClose, onSelect, options }) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <m.div
                className="bg-black rounded-lg p-4 w-responsive-popup"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                <ul className="flex flex-col justify-center gap-5">
                    {options.map((option) => (
                        <li key={option}>
                            <button
                                type="button"
                                className="bg-lilaPrincipal text-responsive-td-table w-full text-white px-4 py-2 rounded-md hover:bg-lilaSecundario"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onSelect(option);
                                    onClose();
                                }}
                            >
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    className="mt-4 w-full text-white text-responsive-td-table hover:text-gray-400"
                    onClick={(e) => {
                        e.preventDefault();
                        onClose();
                    }}
                >
                    Cancelar
                </button>
            </m.div>
        </div>,
        document.body
    );
}
