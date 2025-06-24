"use client";
import {Button} from "@/components/ui/button";

export const ControlPanelButton = ({
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
        <Button
            className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]} ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </Button>
    );
};
