import { useEffect, useRef } from "react";

export default function AutoResizingTextarea({
    value = "",
    onChange,
    className,
}) {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.value = value;
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            rows={1}
            defaultValue={value}
            onChange={(e) => {
                textareaRef.current.value = e.target.value;
                onChange(e);
            }}
            className={className}
            onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
            }}
        />
    );
}
