"use client";
import { useEffect, useRef, useState } from "react";
import type { ReactNode, ChangeEventHandler, FocusEventHandler } from "react";
import Input from "./Input";

type Props = {
  label?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (next: string) => void;
  onSelect?: (next: string) => void;
  suggestions?: string[];
  placeholder?: string;
  error?: string;
  success?: boolean;
  fullWidth?: boolean;
  expandedResults?: boolean;
  name?: string;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  className?: string;
};

export default function Autocomplete({
  label,
  icon,
  value = "",
  onChange,
  onSelect,
  suggestions = [],
  placeholder,
  error,
  success,
  fullWidth,
  name,
  inputMode,
  autoComplete,
  onBlur,
  onFocus,
  expandedResults,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e.target.value);
    setOpen(true);
  };

  return (
    <div
      ref={containerRef}
      className={[
        fullWidth ? "w-full" : "max-w-[311px]",
        "relative",
        className || "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Input
        fullWidth={fullWidth}
        label={label}
        icon={icon}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        error={error}
        success={success}
        name={name}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onBlur={(e) => {
          onBlur?.(e);
        }}
        onFocus={(e) => {
          setOpen(true);
          onFocus?.(e);
        }}
      />
      {open && !expandedResults && suggestions.length > 0 ? (
        <div className="absolute left-0 right-0 mt-1 z-20">
          <ul className="max-h-[210px] overflow-auto scrollbar-hidden bg-white border border-text rounded-[12px] shadow p-[10px]">
            {suggestions.map((s, idx) => {
              const q = (value || "").trim();
              const lower = s.toLowerCase();
              const qi = q.toLowerCase();
              const matchIndex = q ? lower.indexOf(qi) : -1;
              const hasMatch = q.length > 0 && matchIndex >= 0;
              const before = hasMatch ? s.slice(0, matchIndex) : s;
              const match = hasMatch
                ? s.slice(matchIndex, matchIndex + q.length)
                : "";
              const after = hasMatch ? s.slice(matchIndex + q.length) : "";
              return (
                <li key={`${s}-${idx}`}>
                  <button
                    type="button"
                    className="w-full text-left py-2 hover:bg-hover rounded-[8px] px-2"
                    onMouseDown={() => {
                      onSelect?.(s);
                      onChange?.(s);
                      setOpen(false);
                    }}
                  >
                    {hasMatch ? (
                      <>
                        {before ? (
                          <span className="text-[16px] leading-[19px] font-[500]">
                            {before}
                          </span>
                        ) : null}
                        <span className="text-[16px] leading-[19px] font-extrabold">
                          {match}
                        </span>
                        {after ? (
                          <span className="text-[16px] leading-[19px] font-[500]">
                            {after}
                          </span>
                        ) : null}
                      </>
                    ) : (
                      <span className="text-[16px] leading-[19px] font-[500]">
                        {s}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
