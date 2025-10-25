"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    fetch("/api/error-logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        digest: error.digest,
      }),
    }).catch(() => {});
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-text text-[20px] md:text-[24px] font-extrabold">
        Something went wrong
      </h2>
      <p className="text-text/80 text-[14px] leading-6 max-w-[520px]">
        An unexpected error occurred while rendering this page. You can try
        again.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-[4px] border px-3 py-2 bg-success border-text text-text hover:text-white active:bg-text active:text-white"
      >
        Try again
      </button>
    </div>
  );
}
