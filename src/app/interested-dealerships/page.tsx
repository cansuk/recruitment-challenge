"use client";
import { useEffect, useMemo, useState } from "react";
import DealershipSearch from "@/components/dealerships/DealershipSearch";
import DealershipList from "@/components/dealerships/DealershipList";
import { Spinner } from "@/components/ui";
import type { Submission } from "@/types";

export default function InterestedDealershipsPage() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false); // initial search loading
  const [loadingMore, setLoadingMore] = useState(false); // pagination loading
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const limit = 3;

  const debouncedQuery = useMemo(() => query, [query]);

  useEffect(() => {
    const ctrl = new AbortController();
    const id = setTimeout(() => {
      if (!debouncedQuery.trim()) {
        setItems([]);
        setTotal(0);
        setOffset(0);
        return;
      }
      setLoading(true);
      const p = new URLSearchParams({
        q: debouncedQuery.trim(),
        limit: String(limit),
        offset: String(0),
      });
      fetch(`/api/submissions?${p.toString()}`, { signal: ctrl.signal })
        .then((r) => r.json())
        .then((data) => {
          setItems(data.items || []);
          setTotal(data.total || 0);
          setOffset((data.items || []).length);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 300);
    return () => {
      clearTimeout(id);
      ctrl.abort();
    };
  }, [debouncedQuery]);

  // infinite scroll to load more
  useEffect(() => {
    const el = document.getElementById("idl-scroll");
    function onScroll() {
      if (loading || loadingMore) return;
      if (items.length >= total) return;
      if (!el) return;
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 16;
      if (!nearBottom) return;
      setLoadingMore(true);
      const p = new URLSearchParams({
        q: debouncedQuery.trim(),
        limit: String(limit),
        offset: String(offset),
      });
      fetch(`/api/submissions?${p.toString()}`)
        .then((r) => r.json())
        .then((data) => {
          const next = data.items || [];
          setItems((prev) => [...prev, ...next]);
          setOffset((prev) => prev + next.length);
          setTotal(data.total || total);
        })
        .finally(() => setLoadingMore(false));
    }
    el?.addEventListener("scroll", onScroll);
    return () => el?.removeEventListener("scroll", onScroll);
  }, [loading, loadingMore, items.length, total, offset, debouncedQuery]);
  return (
    <main className="min-h-[calc(100vh-92px)] bg-[#5A698C] text-text">
      <section className="-mt-4 py-10 px-2 md:px-0">
        <div className="mx-auto w-full md:w-[60%]">
          <h1 className="font-inter text-white font-[850] text-[28px] leading-[40px] md:font-extrabold md:text-[38px] md:leading-[52px]">
            Interested Dealerships
          </h1>
          <DealershipSearch query={query} onChange={setQuery} />
          <div id="idl-scroll" className="mt-5">
            {loading ? (
              <div className="flex justify-center py-6">
                <Spinner size={28} color="#FF733C" />
              </div>
            ) : null}
            <DealershipList
              items={items}
              loading={loading}
              loadingMore={loadingMore}
              total={total}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
