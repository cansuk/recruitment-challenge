import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function TextLink({ href, children, className }: Props) {
  return (
    <Link
      href={href}
      className={[
        "text-success",
        "underline-offset-4 hover:underline hover:decoration-success",
        "transition-colors",
        className || "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Link>
  );
}
