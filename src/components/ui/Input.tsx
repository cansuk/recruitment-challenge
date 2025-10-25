"use client";
import { forwardRef, useId } from "react";
import type { ReactNode, ChangeEventHandler, FocusEventHandler } from "react";
import SuccessIcon from "@/components/icons/SuccessIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";
type InputStatus = "default" | "success" | "error";

type Props = {
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  required?: boolean;
  icon?: ReactNode;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  status?: InputStatus;
  error?: string;
  success?: boolean;
  helperText?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  autoComplete?: string;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  className?: string;
  fullWidth?: boolean;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  {
    id,
    name,
    type = "text",
    label,
    required,
    icon,
    value,
    defaultValue,
    placeholder,
    disabled,
    status = "default",
    error,
    success,
    helperText,
    onChange,
    onBlur,
    onFocus,
    autoComplete,
    inputMode,
    className,
    fullWidth,
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;
  const messageId = `${inputId}-message`;

  const isError = !!error || status === "error";
  const isSuccess = !isError && ((success ?? false) || status === "success");
  const isDisabled = !!disabled;

  const showSuffix = isError || isSuccess;

  return (
    <div
      className={["w-full", fullWidth ? "" : "max-w-[311px]", className || ""]
        .filter(Boolean)
        .join(" ")}
    >
      {label ? (
        <label
          htmlFor={inputId}
          className={[
            "flex",
            "items-center",
            "gap-2",
            "mb-2",
            "text-[16px]",
            "leading-6",
            "font-extrabold",
            "text-text",
            "font-inter",
          ].join(" ")}
        >
          {icon ? <span aria-hidden>{icon}</span> : null}
          <span>
            {label}
            {required ? (
              <span aria-hidden className="text-error ml-0.5">
                *
              </span>
            ) : null}
          </span>
        </label>
      ) : null}

      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={isDisabled}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-invalid={isError || undefined}
          aria-describedby={isError || helperText ? messageId : undefined}
          className={[
            "w-full",
            "bg-white",
            "text-text",
            "placeholder:text-placeholder",
            "rounded-[27px]",
            "px-6",
            "py-3",
            "text-[16px]",
            "transition-all",
            "outline-none",
            "border",
            isDisabled ? "bg-gray-100 opacity-60 cursor-not-allowed" : "",
            showSuffix ? "pr-12" : "",
            isError
              ? "border-error focus:ring-2 focus:ring-error"
              : isSuccess
                ? "border-success focus:ring-2 focus:ring-success"
                : "border-border focus:ring-2 focus:ring-border",
          ]
            .filter(Boolean)
            .join(" ")}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onInvalid={(e) => e.preventDefault()}
        />

        {isSuccess ? (
          <SuccessIcon
            aria-hidden
            className="absolute right-6 top-1/2 -translate-y-1/2 text-success"
            width={16}
            height={16}
          />
        ) : null}
        {isError ? (
          <ErrorIcon
            aria-hidden
            className="absolute right-6 top-1/2 -translate-y-1/2 text-error"
            width={16}
            height={16}
          />
        ) : null}
      </div>

      {isError ? (
        <p
          id={messageId}
          role="alert"
          className="mt-1.5 text-[12px] leading-4 font-normal text-error"
        >
          {error}
        </p>
      ) : helperText ? (
        <p
          id={messageId}
          className="mt-1.5 text-[12px] leading-4 font-normal text-gray-500"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
