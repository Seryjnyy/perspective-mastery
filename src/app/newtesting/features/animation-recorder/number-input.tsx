import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { isValidNumber } from "@/lib/utils";

type NumberInputProps = {
  label?: string;
  value: number;
  onChange: (val: number) => void;
  step?: number;
  min?: number;
  max?: number;
  placeholder?: string;
};

export function NumberInput({
  label,
  value,
  onChange,
  step = 1,
  min,
  max,
  placeholder,
}: NumberInputProps) {
  const [internal, setInternal] = useState<string>(value.toString());

  useEffect(() => {
    setInternal(value.toString());
  }, [value]);

  const handleBlur = () => {
    if (isValidNumber(internal)) {
      const parsed = parseFloat(internal);
      let final = parsed;
      if (min !== undefined) final = Math.max(final, min);
      if (max !== undefined) final = Math.min(final, max);
      onChange(final);
    } else {
      console.log("resetting to previous valid value");
      setInternal(value.toString()); // reset to previous valid value
    }
  };

  return (
    <Input
      type="text"
      value={internal}
      onChange={(e) => setInternal(e.target.value)}
      onBlur={() => {
        console.log("onBlur");
        handleBlur();
      }}
      placeholder={placeholder}
    />
  );
}
