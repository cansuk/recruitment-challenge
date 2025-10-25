import { forwardRef } from "react";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

type Props = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: "xs" | "sm" | "md" | "lg";
  rounded?: "none" | "full";
  icon?: "default" | "none";
  asChild?: boolean;
  fullWidth?: boolean;
};

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    children,
    type = "button",
    disabled,
    className,
    onClick,
    size = "md",
    rounded = "full",
    icon = "default",
    asChild,
    fullWidth,
  },
  ref,
) {
  const sizePadding =
    size === "xs"
      ? "px-3"
      : size === "sm"
        ? "px-4"
        : size === "lg"
          ? "px-12"
          : "px-10";
  const sizeText =
    size === "xs"
      ? "text-[14px]"
      : size === "sm"
        ? "text-[16px]"
        : "text-[21px]";
  const sizeLeading =
    size === "xs"
      ? "leading-[20px]"
      : size === "sm"
        ? "leading-[19px]"
        : "leading-[32px]";
  const sizePy = size === "xs" ? "py-1" : "py-[10.5px]";
  const sizeWeight = size === "xs" ? "font-normal" : "font-medium";
  const roundedClass = rounded === "none" ? "rounded-[4px]" : "rounded-full";
  const widthClass = fullWidth ? "w-full" : "";
  if (asChild) {
    return (
      <span
        ref={ref as React.RefObject<HTMLSpanElement> | undefined}
        className={[
          roundedClass,
          "border",
          sizePadding,
          sizePy,
          "transition-colors",
          "inline-flex",
          "items-center",
          "justify-center",
          "gap-[10px]",
          "bg-success",
          "border-text",
          "text-text",
          "cursor-pointer",
          sizeText,
          sizeLeading,
          sizeWeight,
          "hover:text-white",
          "hover:[&>svg]:text-white",
          "active:bg-text",
          "active:text-white",
          disabled ? "opacity-60 cursor-not-allowed" : "",
          widthClass,
          className || "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
        {icon !== "none" ? (
          <ArrowRightIcon aria-hidden className="shrink-0" />
        ) : null}
      </span>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        roundedClass,
        "border",
        sizePadding,
        sizePy,
        "transition-colors",
        "flex",
        "items-center",
        "justify-center",
        "gap-[10px]",
        "bg-success",
        "border-text",
        "text-text",
        "cursor-pointer",
        sizeText,
        sizeLeading,
        sizeWeight,
        "hover:text-white",
        "hover:[&>svg]:text-white",
        "active:bg-text",
        "active:text-white",
        disabled ? "opacity-60 cursor-not-allowed" : "",
        widthClass,
        className || "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span>{children}</span>
      {icon !== "none" ? (
        <ArrowRightIcon aria-hidden className="shrink-0" />
      ) : null}
    </button>
  );
});

export default Button;
