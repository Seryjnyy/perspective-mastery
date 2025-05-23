const Slider = ({
    label,
    value,
    min,
    max,
    step,
    onChange,
    disabled = false,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    disabled?: boolean;
    onChange: (val: number) => void;
}) => (
    <div className="mb-2">
        <label className="block">
            {label}:
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full mt-1"
                disabled={disabled}
            />
            {typeof value === "number" ? value.toFixed(1) : value}
        </label>
    </div>
);

const Checkbox = ({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
    <div className="mb-2">
        <label className="flex items-center">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="mr-2"
            />
            {label}
        </label>
    </div>
);

const Button = ({
    children,
    onClick,
    variant = "primary",
    disabled = false,
    size = "normal",
}: {
    children: React.ReactNode;
    onClick: () => void;
    variant?: "primary" | "secondary" | "success" | "danger";
    disabled?: boolean;
    size?: "small" | "normal";
}) => {
    const baseClasses = "rounded text-white font-medium transition-colors";
    const sizeClasses = size === "small" ? "px-2 py-1 text-xs" : "px-3 py-1";
    const variantClasses = {
        primary: "bg-blue-600 hover:bg-blue-700",
        secondary: "bg-gray-600 hover:bg-gray-700",
        success: "bg-green-600 hover:bg-green-700",
        danger: "bg-red-600 hover:bg-red-700",
    };

    return (
        <button
            className={`${baseClasses} ${sizeClasses} ${
                variantClasses[variant]
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

const TabButton = ({
    children,
    active,
    onClick,
}: {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
}) => (
    <button
        className={`flex-1 py-1 ${
            active ? "bg-gray-600" : "bg-gray-800"
        } border-none text-white cursor-pointer transition-colors hover:bg-gray-500`}
        onClick={onClick}
    >
        {children}
    </button>
);

export { Slider, Checkbox, Button, TabButton };
