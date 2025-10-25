import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function Container({ className, style, ...rest }: Props) {
  return (
    <div
      className={["mx-auto", className || ""].filter(Boolean).join(" ")}
      style={{
        maxWidth: "var(--page-max-width)",
        ...style,
      }}
      {...rest}
    />
  );
}
