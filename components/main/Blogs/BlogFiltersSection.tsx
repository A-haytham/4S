"use client";

import { Filter, Search } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

type BlogFiltersSectionProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  isRTL: boolean;
  labels: {
    placeholder: string;
    filterTitle: string;
    categoryMap: Record<string, string>;
  };
};

export default function BlogFiltersSection({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  isRTL,
  labels,
}: BlogFiltersSectionProps) {
  return (
    <Reveal>
      <section className="mx-auto -mt-8 max-w-7xl px-4">
        <div className="rounded-2xl bg-white p-6 shadow-xl md:p-8">
          <div className="mb-6">
            <div className="relative">
              <Search
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                  isRTL ? "right-4" : "left-4"
                }`}
                size={20}
              />
              <input
                type="text"
                placeholder={labels.placeholder}
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                className={`w-full rounded-xl border border-gray-200 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0F4C81] ${
                  isRTL ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Filter size={18} />
              <span className="text-sm font-medium">{labels.filterTitle}:</span>
            </div>
            {categories.map((category) => {
              const label = labels.categoryMap[category] ?? category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-[#0F4C81] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
