"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  DollarSign,
  HelpCircle,
  Search,
  Settings,
  Shield,
} from "lucide-react";
import CtaSection from "@/components/ui/CtaSection";
import type { CtaButton } from "@/components/ui/CtaSection";
import Reveal from "@/components/ui/Reveal";

const iconMap = {
  basics: HelpCircle,
  implementation: Settings,
  security: Shield,
  pricing: DollarSign,
};

type FaqItem = {
  question: string;
  answer: string;
};

type Category = {
  id: string;
  name: string;
  icon: string;
  faqs: FaqItem[];
};

type FaqsCopy = {
  hero: {
    title: string;
    description: string;
  };
  search: {
    placeholder: string;
    noResults: string;
  };
  categories: Category[];
  expandAll: string;
  collapseAll: string;
  cta: {
    title: string;
    description: string;
    button: string;
  };
};

type FAQsClientProps = {
  copy: FaqsCopy;
  isRTL: boolean;
};

export default function FAQsClient({ copy, isRTL }: FAQsClientProps) {
  const categories = copy.categories;
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.id ?? "basics"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [allExpanded, setAllExpanded] = useState(false);

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) return currentCategory?.faqs ?? [];

    const query = searchQuery.toLowerCase();
    return (currentCategory?.faqs ?? []).filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }, [searchQuery, currentCategory]);

  const toggleFAQ = (categoryId: string, faqIndex: number) => {
    const key = `${categoryId}-${faqIndex}`;
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedItems(newExpanded);
  };

  const toggleExpandAll = () => {
    if (allExpanded) {
      setExpandedItems(new Set());
      setAllExpanded(false);
      return;
    }

    const allKeys = new Set(
      filteredFAQs.map((_, idx) => `${selectedCategory}-${idx}`)
    );
    setExpandedItems(allKeys);
    setAllExpanded(true);
  };

  const isFAQExpanded = (categoryId: string, faqIndex: number) => {
    return expandedItems.has(`${categoryId}-${faqIndex}`);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery("");
    setExpandedItems(new Set());
    setAllExpanded(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setExpandedItems(new Set());
    setAllExpanded(false);
  };

  const ctaButtons: CtaButton[] = [
    {
      label: copy.cta.button,
      href: "/contact-us",
      variant: "primary",
      withArrow: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="sticky top-20 z-10 border-b border-gray-200 bg-gray-50 py-8 shadow-sm">
        <Reveal>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <Search
                  size={20}
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                    isRTL ? "right-4" : "left-4"
                  }`}
                />
                <input
                  type="text"
                  placeholder={copy.search.placeholder}
                  value={searchQuery}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  className={`w-full rounded-xl border-2 border-gray-300 py-4 text-gray-900 transition-colors focus:border-[#0F4C81] focus:outline-none ${
                    isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                  }`}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="sticky top-46 z-10 border-b border-gray-200 bg-white">
        <Reveal>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto py-4">
              <div className="mx-auto flex gap-3">
                {categories.map((category) => {
                  const Icon =
                    iconMap[category.icon as keyof typeof iconMap] ?? HelpCircle;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategorySelect(category.id)}
                      className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all ${
                        selectedCategory === category.id
                          ? "bg-[#0F4C81] text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Icon size={20} />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {filteredFAQs.length > 0 ? (
              <>
                <div className="mb-6 flex justify-end">
                  <button
                    type="button"
                    onClick={toggleExpandAll}
                    className="text-sm font-medium text-[#0F4C81] underline hover:text-[#083A61]"
                  >
                    {allExpanded ? copy.collapseAll : copy.expandAll}
                  </button>
                </div>

                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => {
                    const isExpanded = isFAQExpanded(selectedCategory, index);
                    return (
                      <div
                        key={`${selectedCategory}-${index}`}
                        className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm transition-all hover:border-[#0F4C81] hover:shadow-md"
                      >
                        <button
                          type="button"
                          onClick={() => toggleFAQ(selectedCategory, index)}
                          className="flex w-full items-start justify-between px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-[#0F4C81] focus:ring-offset-2 ltr:text-left rtl:text-right"
                          aria-expanded={isExpanded}
                        >
                          <h3 className="text-lg font-semibold text-gray-900">
                            {faq.question}
                          </h3>
                          <ChevronDown
                            size={22}
                            className={`shrink-0 text-[#0F4C81] transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            isExpanded
                              ? "max-h-250 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="px-6 pb-6 pt-4">
                            <p className="text-base leading-relaxed text-gray-700">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="py-16 text-center">
                <Search size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg text-gray-600">{copy.search.noResults}</p>
              </div>
            )}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <CtaSection
          title={copy.cta.title}
          description={copy.cta.description}
          buttons={ctaButtons}
          variant="primary"
          size="lg"
        />
      </Reveal>
    </div>
  );
}
