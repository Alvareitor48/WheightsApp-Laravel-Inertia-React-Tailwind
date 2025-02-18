import ReactDOM from "react-dom";
import { m } from "motion/react";
import { useState } from "react";

export function PasswordPopUp({ isOpen, onClose, onConfirm }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        onConfirm(password, setError);
    };
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <m.div
                className="bg-black rounded-lg p-6 w-responsive-popup text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                <h2 className="text-responsive-h3 text-white mb-4">
                    Escribe tu contraseña para eliminar la cuenta
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Introduce tu contraseña"
                        className="block w-full p-2 border rounded bg-gray-800 text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                    >
                        Eliminar cuenta
                    </button>
                </form>
                <button
                    type="button"
                    className="mt-4 w-full text-white hover:text-gray-400"
                    onClick={(e) => {
                        e.preventDefault();
                        onClose();
                    }}
                >
                    Cerrar
                </button>
            </m.div>
        </div>,
        document.body
    );
}
