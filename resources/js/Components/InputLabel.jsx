export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-responsive-td-table font-medium text-white ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
