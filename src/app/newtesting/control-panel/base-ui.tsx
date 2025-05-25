import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const SliderSetting = ({
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
}) => {
  const id = `slider-${label}`;
  return (
    <div className="mb-2 space-y-2">
      <Label className="block" htmlFor={id}>
        {label}:
      </Label>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(val) => {
          if (val.length > 0) {
            onChange(val[0]);
          }
        }}
        disabled={disabled}
      />
      {value.toFixed(2)}
    </div>
  );
};

const CheckboxSetting = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) => {
  const id = `checkbox-${label}`;
  return (
    <div className="mb-2">
      <Label className="flex items-center" htmlFor={id}>
        {label}
      </Label>
      <Checkbox
        checked={checked}
        onCheckedChange={(checked) => {
          if (checked == "indeterminate") {
            onChange(true);
          } else {
            onChange(checked);
          }
        }}
        className="mr-2"
      />
    </div>
  );
};

const ButtonSetting = ({
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

export { SliderSetting, CheckboxSetting, ButtonSetting };
