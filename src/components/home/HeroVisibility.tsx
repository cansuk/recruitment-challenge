"use client";
import { useEffect, useState, type ReactNode } from "react";

type Props = { children: ReactNode };

export default function HeroVisibility({ children }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY === 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return <>{children}</>;
}
