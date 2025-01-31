import { useEffect, useRef } from "react";

export default function AutoResizingTextarea({
    value = "",
    onChange,
    className,
}) {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.value = value; // ✅ Forzar que el valor sea el correcto
            textareaRef.current.style.height = "auto"; // 🔄 Resetear la altura
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 🔄 Ajustar al contenido
        }
    }, [value]); // ✅ Se ejecuta cuando cambia `value`

    return (
        <textarea
            ref={textareaRef}
            rows={1}
            defaultValue={value} // ✅ Evita el control total de React sobre el `textarea`
            onChange={(e) => {
                textareaRef.current.value = e.target.value; // ✅ Sincronizar manualmente
                onChange(e); // ✅ Mantener la actualización en el estado de React
            }}
            className={className}
            onInput={(e) => {
                e.target.style.height = "auto"; // 🔄 Resetear antes de cambiar
                e.target.style.height = `${e.target.scrollHeight}px`; // 🔄 Ajustar altura en tiempo real
            }}
        />
    );
}
