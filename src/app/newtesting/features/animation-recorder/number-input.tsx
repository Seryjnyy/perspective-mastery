"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { isValidNumber } from "@/lib/utils";

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: number;
  onValueChange?: (val: number) => boolean | void;
  step?: number;
  min?: number;
  max?: number;
  placeholder?: string;
}

export function NumberInput({
  label,
  value,
  onValueChange,
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
      const wasSetCorrectly = onValueChange?.(final);
      if (wasSetCorrectly === false) {
        setInternal(value.toString()); // reset to previous valid value
      }
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
