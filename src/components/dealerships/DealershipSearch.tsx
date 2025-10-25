"use client";
import CompanyIcon from "@/components/icons/CompanyIcon";
import Autocomplete from "@/components/ui/Autocomplete";

type Props = {
  query: string;
  onChange: (q: string) => void;
};

export default function DealershipSearch({ query, onChange }: Props) {
  return (
    <div className="mt-5 bg-white rounded-[20px] border border-text p-4 md:p-8">
      <div className="mb-[6px] flex items-center gap-2 text-[#545454] text-[16px] leading-6 font-extrabold">
        <span aria-hidden>
          <CompanyIcon className="text-[var(--color-accent)]" />
        </span>
        <span>Search Company</span>
      </div>
      <div>
        <Autocomplete
          fullWidth
          placeholder="Start typing name, company, phone or email for search"
          value={query}
          onChange={onChange}
          expandedResults
        />
      </div>
    </div>
  );
}
