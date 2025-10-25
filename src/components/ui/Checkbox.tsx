"use client";
import { forwardRef, useId, useState } from "react";
import type { ChangeEventHandler } from "react";
import PlusIcon from "@/components/icons/PlusIcon";
import TickSmallIcon from "@/components/icons/TickSmallIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";

type Props = {
  id?: string;
  name?: string;
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  className?: string;
};

const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  {
    id,
    name,
    label,
    checked,
    defaultChecked,
    disabled,
    error,
    success,
    onChange,
    onBlur,
    className,
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id || `checkbox-${generatedId}`;
  const [isChecked, setIsChecked] = useState<boolean>(
    !!(checked ?? defaultChecked),
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsChecked(e.target.checked);
    onChange?.(e);
  };

  return (
    <label htmlFor={inputId} className={["inline-flex items-center"].join(" ")}>
      <input
        ref={ref}
        id={inputId}
        name={name}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        className="peer sr-only"
      />
      <span
        className={[
          "inline-flex items-center",
          "rounded-[27px]",
          "px-4",
          "py-3",
          "border",
          "bg-white",
          "text-text",
          "gap-3",
          "transition-colors",
          "peer-disabled:opacity-60 peer-disabled:cursor-not-allowed",
          "hover:bg-hover",
          "peer-checked:bg-text peer-checked:text-white",
          error ? "border-[#DC3545]" : "border-text",
          className || "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="text-[16px] leading-6 font-inter">{label}</span>
        <span className="inline-flex w-4 h-4 items-center justify-center">
          {!error ? (
            isChecked ? (
              <TickSmallIcon aria-hidden className="text-white" />
            ) : (
              <PlusIcon aria-hidden className="text-current" />
            )
          ) : (
            <ErrorIcon aria-hidden className="text-error" />
          )}
        </span>
      </span>
    </label>
  );
});

export default Checkbox;
