"use client";
import { useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import LoginIcon from "@/components/icons/LoginIcon";

export default function TopBar() {
  const [activeTab, setActiveTab] = useState<"business" | "drivers">(
    "business",
  );

  return (
    <div className="w-full bg-text text-white rounded-b-[16px] relative z-10">
      <Container className="flex items-center justify-between px-4 sm:px-2">
        <div className="flex items-end">
          <nav
            role="tablist"
            aria-label="Site audience"
            className="flex items-end gap-4 text-sm"
          >
            <div className="flex h-10 flex-col items-center justify-end pt-2">
              <button
                role="tab"
                aria-selected={activeTab === "business"}
                onClick={() => setActiveTab("business")}
                className="bg-transparent border-0 text-white/90 hover:text-white focus-visible:outline-none text-[14px] leading-[1px] font-[550] cursor-pointer"
              >
                For business
              </button>
              <div
                className={[
                  "h-1 w-full rounded-t-[10px] mt-4",
                  activeTab === "business"
                    ? "bg-[var(--color-accent)]"
                    : "bg-transparent",
                ].join(" ")}
                aria-hidden
              />
            </div>
            <span className="h-12 w-px bg-border" aria-hidden />
            <div className="flex h-10 flex-col items-center justify-end pt-2">
              <button
                role="tab"
                aria-selected={activeTab === "drivers"}
                onClick={() => setActiveTab("drivers")}
                className="bg-transparent border-0 text-white/90 hover:text-white focus-visible:outline-none text-[14px] leading-[1px] font-[550] cursor-pointer"
              >
                For drivers
              </button>
              <div
                className={[
                  "h-1 w-full rounded-t-[10px] mt-4",
                  activeTab === "drivers"
                    ? "bg-[var(--color-accent)]"
                    : "bg-transparent",
                ].join(" ")}
                aria-hidden
              />
            </div>
          </nav>
        </div>
        <Link
          href="#"
          className="hidden sm:inline-flex items-center gap-2 rounded-[4px] border border-white/20 px-2.5 py-1 text-[14px] leading-[20px] text-white hover:bg-white/10"
        >
          <LoginIcon className="text-white" />
          Partner login
        </Link>
      </Container>
    </div>
  );
}
