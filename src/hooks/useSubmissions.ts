import { useCallback } from "react";

export type QueryParams = {
  q?: string;
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  limit?: number;
  offset?: number;
};

export default function useSubmissions() {
  const fetchList = useCallback(async (params: QueryParams) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") return;
      sp.set(k, String(v));
    });
    const res = await fetch(`/api/submissions?${sp.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  }, []);

  const create = useCallback(async (payload: unknown) => {
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create");
    return res.json();
  }, []);

  return { fetchList, create };
}
