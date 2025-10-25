"use client";
import DealershipCard from "./DealershipCard";
import EmptyState from "./EmptyState";
import type { Submission } from "@/types";

type Props = {
  items: Submission[];
  loading: boolean;
  loadingMore: boolean;
  total: number;
};

export default function DealershipList({
  items,
  loading,
  loadingMore,
  total,
}: Props) {
  return (
    <div
      id="idl-scroll"
      className="mt-5 space-y-3 md:space-y-4 pb-[50px] max-h-[70vh] overflow-auto scrollbar-hidden"
    >
      {loading ? (
        <div className="flex justify-center py-6">Loading...</div>
      ) : null}
      {!loading && items.length === 0 ? <EmptyState /> : null}
      {!loading
        ? items.map((it) => <DealershipCard key={it.id} {...it} />)
        : null}
      {!loading && items.length < total ? (
        loadingMore ? (
          <div className="text-white/90 text-center py-4">Loading more...</div>
        ) : (
          <div className="text-white/90 text-center py-4">Load more...</div>
        )
      ) : null}
    </div>
  );
}
